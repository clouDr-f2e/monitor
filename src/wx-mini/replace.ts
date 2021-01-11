import { options as sdkOptions } from '../core/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { getTimestamp, replaceOld, throttle } from '../utils/helpers'
import { HandleWxAppEvents, HandleWxPageEvents, HandleNetworkEvents, HandleWxRouteEvents } from './handleWxEvents'
import { WxAppEvents, WxPageEvents, WxConsoleEvents, WxRouteEvents, WxEvents, HTTP_CODE, EVENTTYPES, HTTPTYPE } from '../common/constant'
import { variableTypeDetection } from '@/utils'
import { HandleEvents } from '@/browser/handleEvents'
import { MITOHttp } from '@/types/common'
import { transportData } from '@/core'
import { EMethods } from '@/types'

const clickThrottle = throttle(triggerHandlers, 600)

function isFilterHttpUrl(url: string) {
  return sdkOptions.filterXhrUrlRegExp && sdkOptions.filterXhrUrlRegExp.test(url)
}

function replace(type: WxEvents | EVENTTYPES) {
  switch (type) {
    case WxConsoleEvents.Console:
      replaceConsole()
      break
    case EVENTTYPES.XHR:
      replaceRequest()
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
    const methods = [
      WxPageEvents.PageOnShow,
      WxPageEvents.PageOnHide,
      WxPageEvents.PageOnShareAppMessage,
      WxPageEvents.PageOnShareTimeline,
      WxPageEvents.PageOnTabItemTap
    ]
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

// wx.request
export function replaceRequest() {
  const originRequest = wx.request
  Object.defineProperty(wx, 'request', {
    writable: true,
    enumerable: true,
    configurable: true,
    value: function () {
      const options: WechatMiniprogram.RequestOption = arguments[0]
      const url = options.url
      if ((options.method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) {
        return originRequest.call(this, options)
      }
      // const traceId = options.header[sdkOptions.traceIdFieldName]

      const data: MITOHttp = {
        // traceId,
        type: HTTPTYPE.XHR,
        method: options.method,
        url,
        reqData: options.data,
        sTime: getTimestamp()
      }
      const successHandler: WechatMiniprogram.RequestSuccessCallback = function (res) {
        const endTime = getTimestamp()
        data.responseText = typeof res.data === ('string' || 'object') && res.data
        data.elapsedTime = endTime - data.sTime
        data.status = res.statusCode
        data.errMsg = res.errMsg
        if (typeof options.success === 'function') {
          return options.success(res)
        }
        triggerHandlers(EVENTTYPES.XHR, data)
      }
      const failHandler: WechatMiniprogram.RequestFailCallback = function (err) {
        // 系统和网络层面的失败
        const endTime = getTimestamp()
        data.elapsedTime = endTime - data.sTime
        data.errMsg = err.errMsg

        triggerHandlers(EVENTTYPES.XHR, data)
        if (typeof options.fail === 'function') {
          return options.fail(err)
        }
      }
      const actOptions = {
        ...options,
        success: successHandler,
        fail: failHandler
      }

      return originRequest.call(this, actOptions)
    }
  })
}

// wx Route
export function replaceRoute() {
  const methods = [WxRouteEvents.SwitchTab, WxRouteEvents.ReLaunch, WxRouteEvents.RedirectTo, WxRouteEvents.NavigateTo, WxRouteEvents.NavigateBack]
  methods.forEach((method) => {
    addReplaceHandler({
      callback: (data) => HandleWxRouteEvents[method](data),
      type: method
    })
    // replaceOld(
    //   appOptions,
    //   method.replace('AppOn', 'on'),
    //   function (originMethod: (args: any) => void) {
    //     return function (args: any): void {
    //       triggerHandlers(method, args)
    //       if (originMethod) {
    //         originMethod.apply(this, arguments)
    //       }
    //     }
    //   },
    //   true
    // )
  })
}
