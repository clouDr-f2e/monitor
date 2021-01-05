import { MitoVue } from './Vue/index'
import { setupReplace } from './load'
import { log } from './core/index'
import { _global } from './utils/index'
import { SDK_VERSION, SDK_NAME } from './config'
import { InitOptions } from './types/index'
import { errorBoundaryReport } from './React/index'
import initOptions from './initOpitons'
function init(options: InitOptions = {}): void {
  if (!('XMLHttpRequest' in _global) || options.disabled) return
  initOptions(options)
  setupReplace()
}

export default { MitoVue, SDK_VERSION, SDK_NAME, init, log, errorBoundaryReport }
