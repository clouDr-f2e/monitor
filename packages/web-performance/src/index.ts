/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals, IMetrics } from './types'
import generateUniqueID from './utils/generateUniqueID'
import createReporter from './lib/createReporter'
import MetricsStore from './lib/store'
import { initNavigationTiming } from './metrics/getNavigationTiming'
import { initDeviceInfo } from './metrics/getDeviceInfo'
import { initNetworkInfo } from './metrics/getNetworkInfo'
import { initPageInfo } from './metrics/getPageInfo'

class WebVitals implements IWebVitals {
  metricsStore: MetricsStore

  constructor(config: IConfig) {
    const { projectName, version, reportCallback, immediatelyReport = false } = config
    const sectionId = generateUniqueID(projectName, version)
    const reporter = createReporter(sectionId, reportCallback)
    this.metricsStore = new MetricsStore(reporter)

    initPageInfo(this.metricsStore, reporter, immediatelyReport)
    initDeviceInfo(this.metricsStore, reporter, immediatelyReport)
    initNetworkInfo(this.metricsStore, reporter, immediatelyReport)
    initNavigationTiming(this.metricsStore, reporter, immediatelyReport)
  }

  getCurrentMetrics(): Array<IMetrics> {
    return this.metricsStore.getValues()
  }
}

export { WebVitals }
