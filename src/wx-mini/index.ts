import initOptions from '../common/initOpitons'
import { InitOptions } from '../types/options'
import { isWxMiniEnv } from '../utils'
import { setupReplace } from './load'
import { log } from '../core/index'
import { SDK_VERSION, SDK_NAME } from '../common/config'
function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
}

export default { init, log, SDK_VERSION, SDK_NAME }
