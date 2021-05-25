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
    const { projectName, version, reportCallback, immediately = false, customCompleteEvent = null } = config
    const sectionId = generateUniqueID(projectName, version)
    const reporter = createReporter(sectionId, reportCallback)
    metricsStore = new MetricsStore(reporter)

    afterLoad(() => {
      initPageInfo(metricsStore, reporter, immediately)
      initNetworkInfo(metricsStore, reporter, immediately)
      initNavigationTiming(metricsStore, reporter, immediately)
      initDeviceInfo(metricsStore, reporter, immediately)
    })

    initFP(metricsStore, reporter, immediately)
    initFCP(metricsStore, reporter, immediately)
    initFID(metricsStore, reporter, immediately)
    initLCP(metricsStore, reporter, immediately)
    initResourceFlow(metricsStore, reporter, customCompleteEvent, immediately)
  }

  getCurrentMetrics(): Array<IMetrics> {
    return metricsStore.getValues()
  }

  dispatchCustomEvent(): void {}
}

export { WebVitals }
