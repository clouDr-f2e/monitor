import { replaceOld, isEmptyObject } from '@mitojs/utils'
import Store from '../core/store'
import HandleEvents from './handleEvents'
import { WxPerformanceItemType, WxListenerTypes } from '../constant'
import { WxPerformanceAnyObj } from '../types/index'

export function replaceApp(store: Store) {
  if (App) {
    const originApp = App
    App = function (appOptions: WechatMiniprogram.App.Option) {
      const methods = Object.keys(HandleEvents).filter((m) => m.indexOf('App') !== -1)
      methods.forEach((method) => {
        replaceOld(
          appOptions,
          method.replace('AppOn', 'on'),
          function (originMethod: () => void) {
            return function (...args: any): void {
              // 让原本的函数比抛出的hooks先执行，便于埋点判断是否重复
              if (originMethod) {
                originMethod.apply(this, args)
              }
              store.emit(method as WxPerformanceItemType, args)
            }
          },
          true
        )
      })
      return originApp(appOptions)
    } as WechatMiniprogram.App.Constructor
  }
}

function replacePageLifeMethods(
  options:
    | WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>
    | WechatMiniprogram.Component.MethodOption,
  store: Store
) {
  const pageLifeMethods = Object.keys(HandleEvents).filter((m) => m.indexOf('Page') !== -1)
  pageLifeMethods.forEach((method) => {
    replaceOld(
      options,
      method.replace('PageOn', 'on'),
      function (originMethod: (args: any) => void) {
        return function (...args: any[]): void {
          store.emit(method as WxPerformanceItemType, args)
          if (originMethod) {
            return originMethod.apply(this, args)
          }
        }
      },
      true
    )
  })
}

/**
 * 监听Page, Component下的点击事件
 */
function replaceAction(
  options:
    | WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>
    | WechatMiniprogram.Component.MethodOption,
  store: Store
) {
  const ListenerTypes = Object.keys(WxListenerTypes)
  if (options) {
    Object.keys(options).forEach((m) => {
      if ('function' !== typeof options[m]) {
        return
      }
      replaceOld(
        options,
        m,
        function (originMethod: (args: any) => void) {
          return function (...args: any[]): void {
            const event = args.find((arg) => arg && arg.type && arg.currentTarget)
            if (event && !event.mitoWorked && ListenerTypes.indexOf(event.type) > -1) {
              store.emit(WxListenerTypes[event.type] as WxPerformanceItemType, event)
              event.mitoWorked = true
            }
            return originMethod.apply(this, args)
          }
        },
        true
      )
    })
  }
}

// 重写Page
export function replacePage(store: Store) {
  if (!Page) {
    return
  }
  const originPage = Page
  Page = function (pageOptions): WechatMiniprogram.Page.Constructor {
    replacePageLifeMethods(pageOptions, store)
    replaceAction(pageOptions, store)
    return originPage.call(this, pageOptions)
  }
}

// 重写Component
export function replaceComponent(store: Store) {
  if (!Component) {
    return
  }
  const originComponent = Component
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Component = function (componentOptions): WechatMiniprogram.Component.Constructor {
    if (!isEmptyObject(componentOptions.methods)) {
      replacePageLifeMethods(componentOptions.methods, store)
      replaceAction(componentOptions, store)
    }
    return originComponent.call(this, componentOptions)
  }
}

// 监听网络性能
export function replaceNetwork(store: Store) {
  const HOOKS = {
    request: WxPerformanceItemType.WxRequest,
    downloadFile: WxPerformanceItemType.WxDownloadFile,
    uploadFile: WxPerformanceItemType.WxUploadFile
  }
  Object.keys(HOOKS).forEach((hook) => {
    const originRequest = wx[hook]
    Object.defineProperty(wx, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (...args: any[]) {
        const options: WechatMiniprogram.RequestOption | WechatMiniprogram.DownloadFileOption | WechatMiniprogram.UploadFileOption = args[0]
        const { url } = options
        if (store.filterUrl(url)) {
          return originRequest.call(this, options)
        }

        let reqData = {
          startTime: Date.now(),
          header: options.header || {},
          url: options.url
        } as WxPerformanceAnyObj
        switch (hook) {
          case 'request':
            const { method } = options as WechatMiniprogram.RequestOption
            reqData = { ...reqData, method }
            break
          case 'downloadFile':
          case 'uploadFile':
            const { filePath } = options as WechatMiniprogram.DownloadFileOption | WechatMiniprogram.UploadFileOption
            reqData = { ...reqData, filePath, method: hook === 'downloadFile' ? 'GET' : 'POST' }
            break
          default:
            break
        }

        const originFail = options.fail
        const _fail:
          | WechatMiniprogram.RequestFailCallback
          | WechatMiniprogram.DownloadFileFailCallback
          | WechatMiniprogram.UploadFileFailCallback = function (err) {
          // 系统和网络层面的失败
          const endTime = Date.now()
          reqData.duration = endTime - reqData.startTime
          reqData.status = 0
          reqData.errMsg = err.errMsg
          reqData.endTime = endTime
          store.emit(HOOKS[hook], reqData)
          if (typeof originFail === 'function') {
            return originFail(err)
          }
        }

        const originSuccess = options.success
        const _success:
          | WechatMiniprogram.RequestSuccessCallback
          | WechatMiniprogram.DownloadFileSuccessCallback
          | WechatMiniprogram.UploadFileFailCallback = function (res) {
          const endTime = Date.now()
          reqData.duration = endTime - reqData.startTime
          reqData.status = res.statusCode
          reqData.errMsg = res.errMsg
          reqData.endTime = endTime

          store.emit(HOOKS[hook], reqData)
          if (typeof originSuccess === 'function') {
            return originSuccess(res)
          }
        }

        return originRequest.call(this, {
          ...options,
          success: _success,
          fail: _fail
        })
      }
    })
  })
}
