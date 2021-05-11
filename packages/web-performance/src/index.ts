/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { Config } from './types'
import generateUniqueID from './utils/generateUniqueID'

class WebVitals {
  constructor(config: Config) {
    const { projectName, version } = config
    const sectionId = generateUniqueID(projectName, version)
  }
}

export default WebVitals
