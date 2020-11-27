import { getFlag, setFlag, slientConsoleScope } from 'utils'
import { EVENTTYPES } from 'common'
import { VueInstance, ViewModel } from './types'
import { handleVueError } from './helper'
import { Severity } from '../utils/Severity'

// 监听Vue的时候是否需要加配置项
// interface VuePluginOption {}

const hasConsole = typeof console !== 'undefined'

export const MitoVue = {
  // vue 2.6.1 提供 warnHandler errorHandler报错信息
  install(Vue: VueInstance): void {
    if (getFlag(EVENTTYPES.VUE) || !Vue || !Vue.config) return
    setFlag(EVENTTYPES.VUE, true)
    Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string): void {
      handleVueError.apply(null, [err, vm, info, Severity.Normal, Severity.Error])
      if (hasConsole && !Vue.config.silent) {
        slientConsoleScope(() => {
          console.error('Error in ' + info + ': "' + err.toString() + '"', vm)
          console.error(err)
        })
      }
    }
    // Vue.config.warnHandler = function (msg: string, vm: ViewModel, trace: string): void {
    //   handleVueError.apply(null, [msg, vm, trace, Severity.Low, Severity.Warning])
    //   slientConsoleScope(() => {
    //     hasConsole && console.error('[Vue warn]: ' + msg + trace)
    //   })
    // }
  }
}
