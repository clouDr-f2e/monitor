/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals, IMetrics } from './types'
import generateUniqueID from './utils/generateUniqueID'
import { afterLoad } from './utils'
import createReporter from './lib/createReporter'
import MetricsStore from './lib/store'
import { initNavigationTiming } from './metrics/getNavigationTiming'
import { initDeviceInfo } from './metrics/getDeviceInfo'
import { initNetworkInfo } from './metrics/getNetworkInfo'
import { initPageInfo } from './metrics/getPageInfo'
import { initFP } from './metrics/getFP'
import { initFCP } from './metrics/getFCP'
import { initFID } from './metrics/getFID'
import { initLCP } from './metrics/getLCP'
import { initResourceFlow } from './metrics/getResourceFlow'

let metricsStore: MetricsStore

class WebVitals implements IWebVitals {
  constructor(config: IConfig) {
    const { projectName, version, reportCallback, immediatelyReport = false, customCompleteEvent = null } = config
    const sectionId = generateUniqueID(projectName, version)
    const reporter = createReporter(sectionId, reportCallback)
    metricsStore = new MetricsStore(reporter)

    afterLoad(() => {
      initPageInfo(metricsStore, reporter, immediatelyReport)
      initNetworkInfo(metricsStore, reporter, immediatelyReport)
      initNavigationTiming(metricsStore, reporter, immediatelyReport)
      initDeviceInfo(metricsStore, reporter, immediatelyReport)
    })

    initFP(metricsStore, reporter, immediatelyReport)
    initFCP(metricsStore, reporter, immediatelyReport)
    initFID(metricsStore, reporter, immediatelyReport)
    initLCP(metricsStore, reporter, immediatelyReport)
    initResourceFlow(metricsStore, reporter, customCompleteEvent, immediatelyReport)
  }

  getCurrentMetrics(): Array<IMetrics> {
    return metricsStore.getValues()
  }
}

export { WebVitals }
