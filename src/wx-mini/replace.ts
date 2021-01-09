import { options } from '../core/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { replaceOld, throttle } from '../utils/helpers'
import { HandleWxAppEvents, HandleWxPageEvents } from './handleWxEvents'
import { WxAppEvents, WxPageEvents, WxConsoleEvents, WxEvents } from '../common/constant'
import { variableTypeDetection } from '@/utils'

const clickThrottle = throttle(triggerHandlers, 600)

function isFilterHttpUrl(url: string) {
  return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url)
}

function replace(type: WxEvents) {
  switch (type) {
    case WxConsoleEvents.Console:
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
    App = function (appOptions: WechatMiniprogram.App.Option) {
      const methods = [
        WxAppEvents.AppOnLaunch,
        WxAppEvents.AppOnShow,
        WxAppEvents.AppOnError,
        WxAppEvents.AppOnUnhandledRejection,
        WxAppEvents.AppOnPageNotFound,
        WxAppEvents.AppOnHide
      ]
      methods.forEach((method) => {
        addReplaceHandler({
          callback: (data) => HandleWxAppEvents[method.replace('AppOn', 'on')](data),
          type: method
        })
        replaceOld(
          appOptions,
          method.replace('AppOn', 'on'),
          function (originMethod: (args: any) => void) {
            return function (args: any): void {
              triggerHandlers(method, args)
              if (originMethod) {
                originMethod.apply(this, arguments)
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

export function replacePage() {
  if (!Page) {
    return
  }
  const originPage = Page
  Page = function (appOptions: WechatMiniprogram.Page.ILifetime) {
    const methods = [WxPageEvents.PageOnShow, WxPageEvents.PageOnHide, WxPageEvents.PageOnShareAppMessage]
    methods.forEach((method) => {
      addReplaceHandler({
        callback: (data) => HandleWxPageEvents[method.replace('PageOn', 'on')](data),
        type: method
      })
      replaceOld(
        appOptions,
        method.replace('PageOn', 'on'),
        function (originMethod: (args: any) => void) {
          return function (args: any): void {
            triggerHandlers(method, args)
            if (originMethod) {
              originMethod.apply(this, arguments)
            }
          }
        },
        true
      )
    })
    return originPage(appOptions)
  } as WechatMiniprogram.Page.Constructor
}

function replaceConsole() {
  if (console && variableTypeDetection.isObject(console)) {
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
    logType.forEach(function (level: string): void {
      if (!(level in console)) return
      replaceOld(console, level, function (originalConsole): Function {
        return function (...args: any[]): void {
          if (originalConsole) {
            triggerHandlers(WxConsoleEvents.Console, { args, level })
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
