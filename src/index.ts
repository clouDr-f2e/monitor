import { MitoVue } from './Vue/index'
import { MitoReact } from './React/index'
import { setupReplace } from './load'
import { breadcrumb, transportData, log } from 'core'
import { logger, setSilentFlag } from 'utils'
import { SDK_VERSION, SDK_NAME } from './config'
import { InitOptions } from './types/options'
function init(options: InitOptions = {}): void {
  if (options.disabled) return
  bindOptions(options)
  setupReplace()
}

function bindOptions(options: InitOptions = {}) {
  setSilentFlag(options)
  breadcrumb.bindOptions(options)
  logger.bindOptions(options.debug)
  transportData.bindOptions(options)
}

export default { MitoVue, MitoReact, SDK_VERSION, SDK_NAME, init, log }
