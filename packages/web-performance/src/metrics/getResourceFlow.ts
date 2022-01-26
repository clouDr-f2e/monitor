/**
 * @author allen(https://github.com/Chryseis)
 * ResourceFlow
 * */
import { isPerformanceObserverSupported } from '../utils/isSupported'
import metricsStore from '../lib/store'
import observe from '../lib/observe'
import { IMetrics, IReportHandler } from '../types'
import { metricsName } from '../constants'

const getResourceFlow = (resourceFlow: Array<PerformanceEntry>): PerformanceObserver | undefined => {
  if (!isPerformanceObserverSupported()) {
    console.warn('browser do not support performanceObserver')
    return
  }

  const entryHandler = (entry: PerformanceEntry) => {
    resourceFlow.push(entry)
  }

  return observe('resource', entryHandler)
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {string} customCompleteEvent
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initResourceFlow = (store: metricsStore, report: IReportHandler, customCompleteEvent: string, immediately = true): void => {
  let resourceFlow = []
  const po = getResourceFlow(resourceFlow)

  const completeEvent = customCompleteEvent || 'pageshow'

  const stopListening = () => {
    if (po) {
      if (po.takeRecords) {
        resourceFlow = po.takeRecords().concat(resourceFlow)
      }

      po.disconnect()
    }

    const metrics = { name: metricsName.RL, value: resourceFlow } as IMetrics

    store.set(metricsName.RL, metrics)

    if (immediately) {
      report(metrics)
    }
  }

  addEventListener(completeEvent, stopListening, { once: true, capture: true })
}
