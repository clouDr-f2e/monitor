import { options } from '../core/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { replaceOld, throttle } from '../utils/helpers'
import HandleWxEvents from './handleWxEvents'
import { CompositeEvents, WxEvents } from '../common/common'

const clickThrottle = throttle(triggerHandlers, 600)

function isFilterHttpUrl(url: string) {
  return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url)
}

function replace(type: WxEvents) {
  switch (type) {
    case WxEvents.OnUnhandledRejection:
      // replaceOnUnhandledRejection()
      break
    default:
      break
  }
}

export function addReplaceHandler(handler: ReplaceHandler) {
  subscribeEvent(handler)
  replace(handler.type as WxEvents)
}

// 默认必须重写这些方法，不提供静默配置项
export function replaceApp() {
  if (App) {
    const originApp = App
    App = function (appOptions: WechatMiniprogram.App.Option) {
      const methods = [WxEvents.OnLaunch, WxEvents.OnShow, WxEvents.OnError, WxEvents.OnUnhandledRejection, WxEvents.OnPageNotFound]
      methods.forEach((method) => {
        replaceOld(
          appOptions,
          method,
          function (originMethod) {
            return function (args: any): void {
              HandleWxEvents[method](args)
              if (originMethod) {
                originMethod(args)
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
