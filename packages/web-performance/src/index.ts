/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals } from './types'
import generateUniqueID from './utils/generateUniqueID'

class WebVitals implements IWebVitals {
  constructor(config: IConfig) {
    const { projectName, version } = config
    const sectionId = generateUniqueID(projectName, version)
  }
}

export default WebVitals
