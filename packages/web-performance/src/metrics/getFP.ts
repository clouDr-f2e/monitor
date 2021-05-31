/**
 * @author allen(https://github.com/Chryseis)
 * First Paint,is the time between navigation and when the browser renders the first pixels to the screen,
 * rendering anything that is visually different from what was on the screen prior to navigation.(https://developer.mozilla.org/en-US/docs/Glossary/First_paint)
 * */
import { isPerformanceObserverSupported } from '../utils/isSupported'
import { IMetrics, IReportHandler } from '../types'
import { roundByFour } from '../utils'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'
import observe from '../lib/observe'

const getFP = (): Promise<PerformanceEntry> | undefined => {
  if (!isPerformanceObserverSupported()) {
    console.error('browser do not support performanceObserver')
    return
  }

  return new Promise((resolve) => {
    const entryHandler = (entry: PerformanceEntry) => {
      if (entry.name === 'first-paint') {
        if (po) {
          po.disconnect()
        }

        resolve(entry)
      }
    }

    const po = observe('paint', entryHandler)
  })
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initFP = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  getFP()?.then((entry: PerformanceEntry) => {
    const metrics = { name: metricsName.FP, value: roundByFour(entry.startTime, 2) } as IMetrics

    if (immediately) {
      report(metrics)
    }

    store.set(metricsName.FP, metrics)
  })
}
