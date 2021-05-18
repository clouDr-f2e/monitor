/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals } from './types'
import generateUniqueID from './utils/generateUniqueID'
import createReporter from './lib/createReporter'
import { initNavigationTiming } from './metrics/getNavigationTiming'
import { initDeviceInfo } from './metrics/getDeviceInfo'

class WebVitals implements IWebVitals {
  constructor(config: IConfig) {
    const { projectName, version, reportCallback, immediatelyReport } = config
    const sectionId = generateUniqueID(projectName, version)
    const reporter = createReporter(sectionId, reportCallback)

    initNavigationTiming(reporter, immediatelyReport)
    initDeviceInfo(reporter, immediatelyReport)
  }
}

export default WebVitals
