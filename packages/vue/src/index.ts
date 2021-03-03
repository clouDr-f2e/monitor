import { getFlag, setFlag, slientConsoleScope, Severity } from '@mito/utils'
import { EVENTTYPES } from '@mito/shared'
import { VueInstance, ViewModel } from './types'
import { handleVueError } from './helper'
import { SDK_VERSION, SDK_NAME, init, log } from '@mito/browser'

const hasConsole = typeof console !== 'undefined'

const MitoVue = {
  install(Vue: VueInstance): void {
    if (getFlag(EVENTTYPES.VUE) || !Vue || !Vue.config) return
    setFlag(EVENTTYPES.VUE, true)
    // vue 提供 warnHandler errorHandler报错信息
    Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string): void {
      handleVueError.apply(null, [err, vm, info, Severity.Normal, Severity.Error, Vue])
      if (hasConsole && !Vue.config.silent) {
        slientConsoleScope(() => {
          console.error('Error in ' + info + ': "' + err.toString() + '"', vm)
          console.error(err)
        })
      }
    }
  }
}

export { SDK_VERSION, SDK_NAME, init, log, MitoVue }
