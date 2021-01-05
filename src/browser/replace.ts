import { _global, on, getTimestamp, supportsHistory, replaceOld, isString, throttle, getLocationHref, isExistProperty } from '../utils/index'
import { voidFun, EVENTTYPES, HTTPTYPE, HTTP_CODE } from '../common/common'
import { transportData } from '../core/transportData'
import { options, setTraceId } from '../core/options'
import { EMethods } from '../types/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { MITOHttp, MITOXMLHttpRequest } from '../types/common'

const clickThrottle = throttle(triggerHandlers, 600)

function isFilterHttpUrl(url: string) {
  return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url)
}

function replace(type: EVENTTYPES) {
  switch (type) {
    case EVENTTYPES.XHR:
      xhrReplace()
      break
    case EVENTTYPES.FETCH:
      fetchReplace()
      break
    case EVENTTYPES.ERROR:
      listenError()
      break
    case EVENTTYPES.CONSOLE:
      consoleReplace()
      break
    case EVENTTYPES.HISTORY:
      historyReplace()
      break
    case EVENTTYPES.UNHANDLEDREJECTION:
      unhandledrejectionReplace()
      break
    case EVENTTYPES.DOM:
      domReplace()
      break
    case EVENTTYPES.HASHCHANGE:
      listenHashchange()
      break
    default:
      break
  }
}

export function addReplaceHandler(handler: ReplaceHandler) {
  subscribeEvent(handler)
  replace(handler.type as EVENTTYPES)
}

function xhrReplace(): void {
  if (!('XMLHttpRequest' in _global)) {
    return
  }
  const originalXhrProto = XMLHttpRequest.prototype
  replaceOld(
    originalXhrProto,
    'open',
    (originalOpen: voidFun): voidFun => {
      return function (this: MITOXMLHttpRequest, ...args: any[]): void {
        this.mito_xhr = {
          method: isString(args[0]) ? args[0].toUpperCase() : args[0],
          url: args[1],
          sTime: getTimestamp(),
          type: HTTPTYPE.XHR
        }
        // this.ontimeout = function () {
        //   console.log('超时', this)
        // }
        // this.timeout = 10000
        // on(this, EVENTTYPES.ERROR, function (this: MITOXMLHttpRequest) {
        //   if (this.mito_xhr.isSdkUrl) return
        //   this.mito_xhr.isError = true
        //   const eTime = getTimestamp()
        //   this.mito_xhr.time = eTime
        //   this.mito_xhr.status = this.status
        //   this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime
        //   triggerHandlers(EVENTTYPES.XHR, this.mito_xhr)
        //   logger.error(`接口错误,接口信息:${JSON.stringify(this.mito_xhr)}`)
        // })
        originalOpen.apply(this, args)
      }
    }
  )
  replaceOld(
    originalXhrProto,
    'send',
    (originalSend: voidFun): voidFun => {
      return function (this: MITOXMLHttpRequest, ...args: any[]): void {
        const { method, url } = this.mito_xhr
        setTraceId(url, (headerFieldName: string, traceId: string) => {
          this.mito_xhr.traceId = traceId
          this.setRequestHeader(headerFieldName, traceId)
        })
        options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, this)
        on(this, 'loadend', function (this: MITOXMLHttpRequest) {
          if ((method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) return
          const { responseType, response, status } = this
          this.mito_xhr.reqData = args[0]
          const eTime = getTimestamp()
          this.mito_xhr.time = eTime
          this.mito_xhr.status = status
          if (['', 'json', 'text'].indexOf(responseType) !== -1) {
            this.mito_xhr.responseText = typeof response === 'object' ? JSON.stringify(response) : response
          }
          this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime
          triggerHandlers(EVENTTYPES.XHR, this.mito_xhr)
        })
        originalSend.apply(this, args)
      }
    }
  )
}

function fetchReplace(): void {
  if (!('fetch' in _global)) {
    return
  }
  replaceOld(_global, EVENTTYPES.FETCH, (originalFetch: voidFun) => {
    return function (url: string, config: Partial<Request> = {}): void {
      const sTime = getTimestamp()
      const method = (config && config.method) || 'GET'
      let handlerData: MITOHttp = {
        type: HTTPTYPE.FETCH,
        method,
        reqData: config && config.body,
        url
      }
      const headers = new Headers(config.headers || {})
      Object.assign(headers, {
        setRequestHeader: headers.set
      })
      setTraceId(url, (headerFieldName: string, traceId: string) => {
        handlerData.traceId = traceId
        headers.set(headerFieldName, traceId)
      })
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, headers)
      config = {
        ...config,
        headers
      }

      return originalFetch.apply(_global, [url, config]).then(
        (res: Response) => {
          const tempRes = res.clone()
          const eTime = getTimestamp()
          handlerData = {
            ...handlerData,
            elapsedTime: eTime - sTime,
            status: tempRes.status,
            // statusText: tempRes.statusText,
            time: eTime
          }
          tempRes.text().then((data) => {
            if (method === EMethods.Post && transportData.isSdkTransportUrl(url)) return
            if (isFilterHttpUrl(url)) return
            handlerData.responseText = tempRes.status > HTTP_CODE.UNAUTHORIZED && data
            triggerHandlers(EVENTTYPES.FETCH, handlerData)
          })
          return res
        },
        (err: Error) => {
          const eTime = getTimestamp()
          if (method === EMethods.Post && transportData.isSdkTransportUrl(url)) return
          if (isFilterHttpUrl(url)) return
          handlerData = {
            ...handlerData,
            elapsedTime: eTime - sTime,
            status: 0,
            // statusText: err.name + err.message,
            time: eTime
          }
          triggerHandlers(EVENTTYPES.FETCH, handlerData)
          throw err
        }
      )
    }
  })
}

function listenHashchange(): void {
  if (!isExistProperty(_global, 'onpopstate')) {
    on(_global, EVENTTYPES.HASHCHANGE, function (e: HashChangeEvent) {
      triggerHandlers(EVENTTYPES.HASHCHANGE, e)
    })
  }
}

function listenError(): void {
  on(
    _global,
    'error',
    function (e: ErrorEvent) {
      triggerHandlers(EVENTTYPES.ERROR, e)
    },
    true
  )
}

function consoleReplace(): void {
  if (!('console' in _global)) {
    return
  }
  const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
  logType.forEach(function (level: string): void {
    if (!(level in _global.console)) return
    replaceOld(_global.console, level, function (originalConsole: () => any): Function {
      return function (...args: any[]): void {
        if (originalConsole) {
          triggerHandlers(EVENTTYPES.CONSOLE, { args, level })
          originalConsole.apply(_global.console, args)
        }
      }
    })
  })
}
// 上一次的路由
let lastHref: string
lastHref = getLocationHref()
function historyReplace(): void {
  if (!supportsHistory()) return
  const oldOnpopstate = _global.onpopstate
  _global.onpopstate = function (this: WindowEventHandlers, ...args: any[]): any {
    const to = getLocationHref()
    const from = lastHref
    triggerHandlers(EVENTTYPES.HISTORY, {
      from,
      to
    })
    oldOnpopstate && oldOnpopstate.apply(this, args)
  }
  function historyReplaceFn(originalHistoryFn: voidFun): voidFun {
    return function (this: History, ...args: any[]): void {
      const url = args.length > 2 ? args[2] : undefined
      if (url) {
        const from = lastHref
        const to = String(url)
        lastHref = to
        triggerHandlers(EVENTTYPES.HISTORY, {
          from,
          to
        })
      }
      return originalHistoryFn.apply(this, args)
    }
  }
  replaceOld(_global.history, 'pushState', historyReplaceFn)
  replaceOld(_global.history, 'replaceState', historyReplaceFn)
}

function unhandledrejectionReplace(): void {
  on(_global, EVENTTYPES.UNHANDLEDREJECTION, function (ev: PromiseRejectionEvent) {
    // ev.preventDefault() 阻止默认行为后，控制台就不会再报红色错误
    triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, ev)
  })
}
// replaceOld(_global, EVENTTYPES.UNHANDLEDREJECTION, function (originalUnhandlerejecttion: voidFun): voidFun {
//   return function (...args: any[]) {
//     console.log(EVENTTYPES.UNHANDLEDREJECTION, args)
//     triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, args)
//     if (originalUnhandlerejecttion) {
//       return originalUnhandlerejecttion.apply(this, args)
//     }
//     return true
//   }
// })

function domReplace(): void {
  if (!('document' in _global)) return
  on(
    _global.document,
    'click',
    function () {
      clickThrottle(EVENTTYPES.DOM, {
        category: 'click',
        data: this
      })
    },
    true
  )
  // 暂时不需要keypress的重写
  // on(
  //   _global.document,
  //   'keypress',
  //   function (e: MITOElement) {
  //     keypressThrottle('dom', {
  //       category: 'keypress',
  //       data: this
  //     })
  //   },
  //   true
  // )

  // 不要重写window.addEventLinstner直接用捕获的形式来获取全局的click、keypress
  // 重写window.EventTarget.prototype.addEventListener
  // const proto = EventTarget && EventTarget.prototype
  // if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
  //   return
  // }
  // replaceOld(proto, 'addEventListener', function (
  //   originalAddEventListener
  // ): (eventName: string, fn: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void {
  //   return function (this: any, eventName: string, fn: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
  //     const wrapperListener = (...args) => {
  //       try {
  //         return (fn as Function).apply(this, args)
  //       } catch (error) {
  //         console.log('wrapperListener', error)
  //         throw error
  //       }
  //     }
  //     // switch (eventName) {
  //     //   case 'click':
  //     //     console.log(eventName)
  //     //     clickThrottle('dom', {
  //     //       category: 'click',
  //     //       data: this
  //     //     })
  //     //     break
  //     //   case 'keypress':
  //     //     keypressThrottle('dom', {
  //     //       category: 'keypress',
  //     //       data: this
  //     //     })
  //     //     break
  //     //   default:
  //     //     break
  //     // }
  //     return originalAddEventListener.call(this, eventName, wrapperListener, options)
  //   }
  // })
}

// 考虑兼容性加上handleEvent 可以考虑删掉
// if (fn && (fn as EventListenerObject).handleEvent) {
//   switch (eventName) {
//     case 'click':
//       replaceOld(fn, 'handleEvent', function (originalHandleEvent) {
//         return function (this: any, event: Event) {
//           console.log(event.target)
//           return originalHandleEvent.call(this, event)
//         }
//       })
//       console.log('click', this)
//       break
//     case 'keypress':
//       console.log('keypress', this)
//       break
//     default:
//       break
//   }
// }
