/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals } from './types'
import generateUniqueID from './utils/generateUniqueID'
import createReporter from './lib/createReporter'
import createMetricsStore from './lib/store'
import { initNavigationTiming } from './metrics/getNavigationTiming'
import { initDeviceInfo } from './metrics/getDeviceInfo'
import { initNetworkInfo } from './metrics/getNetworkInfo'

class WebVitals implements IWebVitals {
  constructor(config: IConfig) {
    const { projectName, version, reportCallback, immediatelyReport } = config
    const sectionId = generateUniqueID(projectName, version)
    const reporter = createReporter(sectionId, reportCallback)
    const store = new createMetricsStore(reporter)

    initNavigationTiming(store, reporter, immediatelyReport)
    initDeviceInfo(store, reporter, immediatelyReport)
    initNetworkInfo(store, reporter, immediatelyReport)
  }
}

export default WebVitals
