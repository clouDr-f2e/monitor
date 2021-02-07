import { options as sdkOptions, setTraceId } from '../core/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { getTimestamp, replaceOld, throttle } from '../utils/helpers'
import { HandleWxAppEvents, HandleWxPageEvents } from './handleWxEvents'
import { WxAppEvents, WxPageEvents, WxRouteEvents, WxEvents, HTTP_CODE, EVENTTYPES, HTTPTYPE, BREADCRUMBTYPES, voidFun } from '../common/constant'
import { getFlag, isEmptyObject, setFlag, variableTypeDetection } from '@/utils'
import { MITOHttp } from '@/types/common'
import { TransportData, transportData } from '@/core'
import { EMethods } from '@/types'
import { getCurrentRoute, getNavigateBackTargetUrl } from './utils'
import { ELinstenerTypes } from './constant'
import { MiniRoute } from './types'

function isFilterHttpUrl(url: string) {
  return sdkOptions.filterXhrUrlRegExp && sdkOptions.filterXhrUrlRegExp.test(url)
}

function replace(type: WxEvents | EVENTTYPES) {
  switch (type) {
    case EVENTTYPES.CONSOLE:
      replaceConsole()
      break
    case EVENTTYPES.XHR:
      replaceNetwork()
      break
    case EVENTTYPES.MINI_ROUTE:
      replaceRoute()
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
        if (getFlag(method)) return
        addReplaceHandler({
          callback: (data) => HandleWxAppEvents[method.replace('AppOn', 'on')](data),
          type: method
        })
        replaceOld(
          appOptions,
          method.replace('AppOn', 'on'),
          function (originMethod: voidFun) {
            return function (...args: any): void {
              triggerHandlers.apply(null, [method, ...args])
              if (originMethod) {
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

const pageLifeMethods = [
  WxPageEvents.PageOnShow,
  WxPageEvents.PageOnHide,
  WxPageEvents.PageOnShareAppMessage,
  WxPageEvents.PageOnShareTimeline,
  WxPageEvents.PageOnTabItemTap
]

/**
 * 监听配置项下的页面生命周期函数
 */
function replacePageLifeMethods(
  options: WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption> | WechatMiniprogram.Component.MethodOption
) {
  pageLifeMethods.forEach((method) => {
    replaceOld(
      options,
      method.replace('PageOn', 'on'),
      function (originMethod: (args: any) => void) {
        return function (...args: any[]): void {
          triggerHandlers.apply(null, [method, ...args])
          if (originMethod) {
            originMethod.apply(this, args)
          }
        }
      },
      true
    )
  })
}

// 重写Page
export function replacePage() {
  if (!Page) {
    return
  }
  const originPage = Page

  pageLifeMethods.forEach((method) => {
    if (getFlag(method)) return
    addReplaceHandler({
      callback: (data) => HandleWxPageEvents[method.replace('PageOn', 'on')](data),
      type: method
    })
  })
  Page = function (pageOptions): WechatMiniprogram.Page.Constructor {
    replacePageLifeMethods(pageOptions)
    replaceAction(pageOptions)
    return originPage.call(this, pageOptions)
  }
}

// 重写Component
export function replaceComponent() {
  if (!Component) {
    return
  }
  const originComponent = Component
  // TODO: components全局类型定义没有识别出来
  // @ts-ignore
  Component = function (componentOptions): WechatMiniprogram.Component.Constructor {
    if (!isEmptyObject(componentOptions.methods)) {
      /*
       * 兼容用Component构造页面的上报
       * 当用Component构造页面时，页面的生命周期函数应写在methods定义段中，所以重写componentOptions.methods中的对应周期函数
       */
      replacePageLifeMethods(componentOptions.methods)
      replaceAction(componentOptions.methods)
    }
    return originComponent.call(this, componentOptions)
  }
}

// 重写Behavior
export function replaceBehavior() {
  if (!Behavior) {
    return
  }
  const originBehavior = Behavior
  // TODO: Behaviors全局类型定义没有识别出来
  // @ts-ignore
  Behavior = function (behaviorOptions): WechatMiniprogram.Behavior.Constructor {
    if (!isEmptyObject(behaviorOptions.methods)) {
      /*
       * 当使用Compnent直接构造页面时，用到的behavior中如果有onShow等页面生命周期函数是不会被触发的，所以只用监听手势行为
       */
      replaceAction(behaviorOptions.methods)
    }
    return originBehavior.call(this, behaviorOptions)
  }
}

/**
 * 监听配置项下的手势处理方法
 */
function replaceAction(
  options: WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption> | WechatMiniprogram.Component.MethodOption
) {
  function gestureTrigger(e) {
    e.mitoWorked = true // 给事件对象增加特殊的标记，避免被无限透传
    triggerHandlers(EVENTTYPES.DOM, e)
  }
  const throttleGesturetrigger = throttle(gestureTrigger, 500)
  const linstenerTypes = [ELinstenerTypes.Touchmove, ELinstenerTypes.Tap]
  Object.keys(options).forEach((m) => {
    if ('function' !== typeof options[m]) {
      return
    }
    replaceOld(
      options,
      m,
      function (originMethod: (args: any) => void) {
        return function (...args: any): void {
          const e = args[0]
          if (e && e.type && e.currentTarget && !e.mitoWorked) {
            if (linstenerTypes.indexOf(e.type) > -1) {
              throttleGesturetrigger(e)
            }
          }
          originMethod.apply(this, args)
        }
      },
      true
    )
  })
}

function replaceConsole() {
  if (console && variableTypeDetection.isObject(console)) {
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
    logType.forEach(function (level: string): void {
      if (!(level in console)) return
      replaceOld(console, level, function (originalConsole): Function {
        return function (...args: any[]): void {
          if (originalConsole) {
            triggerHandlers(EVENTTYPES.CONSOLE, { args, level })
            originalConsole.apply(console, args)
          }
        }
      })
    })
  }
}

// wx network
export function replaceNetwork() {
  const hookMethods = ['request', 'downloadFile', 'uploadFile']
  hookMethods.forEach((hook) => {
    const originRequest = wx[hook]
    Object.defineProperty(wx, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (...args: any[]) {
        const options: WechatMiniprogram.RequestOption | WechatMiniprogram.DownloadFileOption | WechatMiniprogram.UploadFileOption = args[0]
        let method: string
        if ((options as WechatMiniprogram.RequestOption).method) {
          method = (options as WechatMiniprogram.RequestOption).method
        } else if (hook === 'downloadFile') {
          method = EMethods.Get
        } else {
          method = EMethods.Post
        }
        const { url, header } = options
        if ((method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) {
          return originRequest.call(this, options)
        }
        let reqData
        if (hook === 'request') {
          reqData = (options as WechatMiniprogram.RequestOption).data
        } else if (hook === 'downloadFile') {
          reqData = {
            filePath: (options as WechatMiniprogram.DownloadFileOption).filePath
          }
        } else {
          // uploadFile
          reqData = {
            filePath: (options as WechatMiniprogram.UploadFileOption).filePath,
            name: (options as WechatMiniprogram.UploadFileOption).name
          }
        }
        const data: MITOHttp = {
          type: HTTPTYPE.XHR,
          method,
          url,
          reqData,
          sTime: getTimestamp()
        }
        setTraceId(url, (headerFieldName, traceId) => {
          data.traceId = traceId
          header[headerFieldName] = traceId
        })
        function setRequestHeader(key: string, value: string) {
          header[key] = value
        }
        sdkOptions.beforeAppAjaxSend && sdkOptions.beforeAppAjaxSend({ method, url }, { setRequestHeader })

        const successHandler:
          | WechatMiniprogram.RequestSuccessCallback
          | WechatMiniprogram.DownloadFileSuccessCallback
          | WechatMiniprogram.UploadFileFailCallback = function (res) {
          const endTime = getTimestamp()
          data.responseText = (variableTypeDetection.isString(res.data) || variableTypeDetection.isObject(res.data)) && res.data
          data.elapsedTime = endTime - data.sTime
          data.status = res.statusCode
          data.errMsg = res.errMsg

          triggerHandlers(EVENTTYPES.XHR, data)
          if (typeof options.success === 'function') {
            return options.success(res)
          }
        }
        const failHandler:
          | WechatMiniprogram.RequestFailCallback
          | WechatMiniprogram.DownloadFileFailCallback
          | WechatMiniprogram.UploadFileFailCallback = function (err) {
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
  })
}

// wx Route
export function replaceRoute() {
  const methods = [WxRouteEvents.SwitchTab, WxRouteEvents.ReLaunch, WxRouteEvents.RedirectTo, WxRouteEvents.NavigateTo, WxRouteEvents.NavigateBack]
  methods.forEach((method) => {
    const originMethod = wx[method] as Function
    Object.defineProperty(wx, method, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (
        options:
          | WechatMiniprogram.SwitchTabOption
          | WechatMiniprogram.ReLaunchOption
          | WechatMiniprogram.RedirectToOption
          | WechatMiniprogram.NavigateToOption
          | WechatMiniprogram.NavigateBackOption
      ) {
        let toUrl
        if (method === WxRouteEvents.NavigateBack) {
          toUrl = getNavigateBackTargetUrl((options as WechatMiniprogram.NavigateBackOption).delta)
        } else {
          toUrl = (options as WechatMiniprogram.SwitchTabOption).url
        }
        const data = {
          from: getCurrentRoute(),
          to: toUrl
        }
        triggerHandlers(EVENTTYPES.MINI_ROUTE, data)
        // 如果complete||success||fail一个都没有，则原方法返回promise，此时sdk也不需要处理
        if (
          variableTypeDetection.isFunction(options.complete) ||
          variableTypeDetection.isFunction(options.success) ||
          variableTypeDetection.isFunction(options.fail)
        ) {
          const failHandler:
            | WechatMiniprogram.SwitchTabFailCallback
            | WechatMiniprogram.ReLaunchFailCallback
            | WechatMiniprogram.RedirectToFailCallback
            | WechatMiniprogram.NavigateToFailCallback
            | WechatMiniprogram.NavigateBackFailCallback = function (res) {
            const failData: MiniRoute = {
              ...data,
              isFail: true,
              message: res.errMsg
            }
            triggerHandlers(EVENTTYPES.MINI_ROUTE, failData)
            if (variableTypeDetection.isFunction(options.fail)) {
              return options.fail(res)
            }
          }
          options.fail = failHandler
        }
        return originMethod.call(this, options)
      }
    })
  })
}
