import { MitoVue } from './Vue/index'
import { setupReplace } from './browser/load'
import { log } from './core/index'
import { isBrowserEnv, isWxMiniEnv, _global } from './utils/index'
import { SDK_VERSION, SDK_NAME } from './shared/src/config'
import { InitOptions } from './types/index'
import { errorBoundaryReport } from './react/src/index'
import initOptions from './shared/initOpitons'
import { init as wxInit } from './wx-mini/index'
function webInit(options: InitOptions = {}): void {
  if (!('XMLHttpRequest' in _global) || options.disabled) return
  initOptions(options)
  setupReplace()
}

function init(options: InitOptions = {}): void {
  if (isBrowserEnv) {
    webInit(options)
  } else if (isWxMiniEnv) {
    wxInit(options)
  }
}

export default { MitoVue, SDK_VERSION, SDK_NAME, init, log, errorBoundaryReport }
