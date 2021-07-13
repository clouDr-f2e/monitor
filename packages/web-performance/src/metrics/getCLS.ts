/**
 * @author allen(https://github.com/Chryseis)
 * Cumulative Layout Shift
 * Have you ever been reading an article online when something suddenly changes on the page?
 * Without warning, the text moves, and you've lost your place.
 * Or even worse: you're about to tap a link or a button,
 * but in the instant before your finger lands—BOOM—the link moves,
 * and you end up clicking something else!
 * */
import { isPerformanceObserverSupported } from '../utils/isSupported'
import observe from '../lib/observe'
import metricsStore from '../lib/store'
import { IReportHandler, LayoutShift, IMetrics } from '../types'
import { metricsName } from '../constants'
import { roundByFour } from '../utils'

const getCLS = (cls): PerformanceObserver | undefined => {
  if (!isPerformanceObserverSupported()) {
    console.warn('browser do not support performanceObserver')
    return
  }

  const entryHandler = (entry: LayoutShift) => {
    if (!entry.hadRecentInput) {
      cls.value += entry.value
    }
  }

  return observe('layout-shift', entryHandler)
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {string} customCompleteEvent
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initCLS = (store: metricsStore, report: IReportHandler, customCompleteEvent: string, immediately = true): void => {
  const cls = { value: 0 }

  const po = getCLS(cls)

  const completeEvent = customCompleteEvent || 'pageshow'

  const stopListening = () => {
    po.takeRecords().map((entry: LayoutShift) => {
      if (!entry.hadRecentInput) {
        cls.value += entry.value
      }
    })
    po.disconnect()

    const metrics = { name: metricsName.CLS, value: roundByFour(cls.value) } as IMetrics

    if (immediately) {
      report(metrics)
    }

    store.set(metricsName.RL, metrics)
  }

  addEventListener(completeEvent, stopListening, { once: true, capture: true })
}
