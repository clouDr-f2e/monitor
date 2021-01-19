import initOptions from '../common/initOpitons'
import { InitOptions } from '../types/options'
import { isWxMiniEnv } from '../utils'
import { setupReplace } from './load'
import { log } from '../core/index'
export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
  Object.assign(wx, { mitoLog: log })
}
