import { options } from '../core/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { replaceOld, throttle } from '../utils/helpers'
import HandleWxEvents from './handleWxEvents'
import { WxEvents } from '../common/constant'
import { variableTypeDetection } from '@/utils'

const clickThrottle = throttle(triggerHandlers, 600)

function isFilterHttpUrl(url: string) {
  return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url)
}

function replace(type: WxEvents) {
  switch (type) {
    case WxEvents.Console:
      replaceConsole()
      break
    default:
      break
  }
}

export function addReplaceHandler(handler: ReplaceHandler) {
  subscribeEvent(handler)
  replace(handler.type as WxEvents)
}

export function replaceApp() {
  if (App) {
    const originApp = App
    App = function g(appOptions: WechatMiniprogram.App.Option) {
      // const methods = [WxEvents.OnLaunch, WxEvents.OnShow, WxEvents.OnError, WxEvents.OnUnhandledRejection, WxEvents.OnPageNotFound]
      const methods = [WxEvents.OnLaunch, WxEvents.OnShow]
      methods.forEach((method) => {
        addReplaceHandler({
          callback: (data) => HandleWxEvents[method](data),
          type: method
        })
        replaceOld(
          appOptions,
          method,
          function (originMethod: (args: any) => void) {
            return function (args: any): void {
              triggerHandlers(method, args)
              if (originMethod) {
                console.log('args', args, this, originMethod)
                originMethod.apply(this, args)
              }
            }
          },
          true
        )
      })
      return originApp(appOptions)
    } as WechatMiniprogram.App.Constructor
  }
}
function replaceConsole() {
  if (console && variableTypeDetection.isObject(console)) {
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
    logType.forEach(function (level: string): void {
      if (!(level in console)) return
      replaceOld(console, level, function (originalConsole): Function {
        return function (...args: any[]): void {
          if (originalConsole) {
            triggerHandlers(WxEvents.Console, { args, level })
            originalConsole.apply(console, args)
          }
        }
      })
    })
  }
}

// todo 类比 xhrReplace
function replaceRequest() {}

// todo 类比 historyReplace
function replaceRoute() {}
