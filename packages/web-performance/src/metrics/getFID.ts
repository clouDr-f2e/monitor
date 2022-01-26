/**
 * @author allen(https://github.com/Chryseis)
 * FID measures the time from when a user first interacts with a page
 * (i.e. when they click a link, tap on a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to begin processing event handlers in response to that interaction.
 * */
import observe from '../lib/observe'
import getFirstHiddenTime from '../lib/getFirstHiddenTime'
import { onHidden } from '../lib/onHidden'
import { isPerformanceObserverSupported } from '../utils/isSupported'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'
import { IReportHandler, IScoreConfig, PerformanceEventTiming } from '../types'
import { roundByFour } from '../utils'
import calcScore from '../lib/calculateScore'

const getFID = (): Promise<PerformanceEntry> | undefined => {
  if (!isPerformanceObserverSupported()) {
    console.warn('browser do not support performanceObserver')
    return
  }

  const firstHiddenTime = getFirstHiddenTime()

  return new Promise((resolve) => {
    // Only report FID if the page wasn't hidden prior to
    // the entry being dispatched. This typically happens when a
    // page is loaded in a background tab.
    const eventHandler = (entry: PerformanceEventTiming) => {
      if (entry.startTime < firstHiddenTime.timeStamp) {
        if (po) {
          po.disconnect()
        }

        resolve(entry)
      }
    }

    const po = observe('first-input', eventHandler)

    if (po) {
      onHidden(() => {
        if (po?.takeRecords) {
          po.takeRecords().map(eventHandler)
        }
        po.disconnect()
      }, true)
    }
  })
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * @param {IScoreConfig} scoreConfig
 * */
export const initFID = (store: metricsStore, report: IReportHandler, immediately = true, scoreConfig: IScoreConfig): void => {
  getFID()?.then((entry: PerformanceEventTiming) => {
    const metrics = {
      name: metricsName.FID,
      value: {
        eventName: entry.name,
        targetCls: entry.target?.className,
        startTime: roundByFour(entry.startTime, 2),
        delay: roundByFour(entry.processingStart - entry.startTime, 2),
        eventHandleTime: roundByFour(entry.processingEnd - entry.processingStart, 2)
      },
      score: calcScore(metricsName.FID, roundByFour(entry.processingStart - entry.startTime, 2), scoreConfig)
    }

    store.set(metricsName.FID, metrics)

    if (immediately) {
      report(metrics)
    }
  })
}
