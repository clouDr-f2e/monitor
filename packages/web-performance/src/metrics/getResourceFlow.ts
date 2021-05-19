/*
 * @author allen(https://github.com/Chryseis)
 * ResourceFlow
 * */
import { isPerformanceSupported } from '../utils/isSupported'
import metricsStore from '../lib/store'
import { IMetrics, IPerformanceNavigationTiming, IReportHandler } from '../types'
import { metricsName } from '../constants'

const getResourceFlow = (): PerformanceEntryList | undefined => {
  if (!isPerformanceSupported()) {
    console.error('browser do not support performance')
    return
  }

  return performance.getEntriesByType('resource')
}

/*
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initResourceFlow = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  const resourceFlow: PerformanceEntryList = getResourceFlow()

  const metrics = { name: metricsName.RL, value: resourceFlow } as IMetrics

  if (immediately) {
    report(metrics)
  }

  store.set(metricsName.RL, metrics)
}
