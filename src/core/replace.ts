import {
  _global,
  on,
  getTimestamp,
  supportsHistory,
  getFunctionName,
  replaceOld,
  isString,
  nativeTryCatch,
  throttle,
  setFlag,
  getFlag,
  getLocationHref,
  isExistProperty
} from 'utils'
import { voidFun, EVENTTYPES, HTTPTYPE } from '@/common'
import { transportData } from './transportData'
import { logger } from '@/utils/logger'

export interface MITOHttp {
  type: HTTPTYPE
  method?: string
  url?: string
  status?: number
  reqData?: any
  statusText?: string
  sTime?: number
  elapsedTime?: number
  responseText?: any
  time?: number
  isSdkUrl?: boolean
}

export interface MITOXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any
  mito_xhr?: MITOHttp
}

interface ReplaceHandler {
  type: EVENTTYPES
  callback: ReplaceCallback
}

type ReplaceCallback = (data: any) => void

const handlers: { [key in EVENTTYPES]?: ReplaceCallback[] } = {}

const clickThrottle = throttle(triggerHandlers, 600)
// const keypressThrottle = throttle(triggerHandlers, 500)

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
      replaceConsole()
      break
    case EVENTTYPES.HISTORY:
      replaceHistory()
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

export function addReplaceHandler(handler: ReplaceHandler): void {
  if (!handler) {
    return
  }
  if (getFlag(handler.type)) return
  setFlag(handler.type, true)
  handlers[handler.type] = handlers[handler.type] || []
  handlers[handler.type].push(handler.callback)
  replace(handler.type)
}

function triggerHandlers(type: EVENTTYPES, data: any): void {
  if (!type || !handlers[type]) return
  handlers[type].forEach((callback) => {
    nativeTryCatch(
      () => {
        callback(data)
      },
      (e: Error) => {
        logger.error(`重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName: ${getFunctionName(callback)}\nError: ${e}`)
      }
    )
  })
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
        const url = args[1]
        this.mito_xhr = {
          method: isString(args[0]) ? args[0].toUpperCase() : args[0],
          url: args[1],
          sTime: getTimestamp(),
          type: HTTPTYPE.XHR
        }
        // 需要判断如果是监控本身自己得请求做个标记，不发送请求
        if (this.mito_xhr.method === 'POST' && transportData.isSdkTransportUrl(url)) {
          this.mito_xhr.isSdkUrl = true
        }
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
        on(this, 'loadend', function (this: MITOXMLHttpRequest) {
          if (this.mito_xhr.isSdkUrl) return
          this.mito_xhr.reqData = args[0]
          const eTime = getTimestamp()
          this.mito_xhr.time = eTime
          this.mito_xhr.status = this.status
          this.mito_xhr.statusText = this.statusText
          this.mito_xhr.responseText = this.responseText
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
    return function (url: string, config: Request): void {
      const sTime = getTimestamp()
      return originalFetch.apply(_global, [url, config]).then(
        (res: Response) => {
          const tempRes = res.clone()
          const eTime = getTimestamp()
          const handlerData: MITOHttp = {
            elapsedTime: eTime - sTime,
            type: HTTPTYPE.FETCH,
            reqData: config && config.body,
            method: (config && config.method) || 'GET',
            url,
            status: tempRes.status,
            statusText: tempRes.statusText,
            time: eTime
          }
          tempRes.text().then((data) => {
            handlerData.responseText = data
            triggerHandlers(EVENTTYPES.FETCH, handlerData)
          })
          return res
        },
        (err: Error) => {
          const eTime = getTimestamp()
          const handlerData: MITOHttp = {
            elapsedTime: eTime - sTime,
            type: HTTPTYPE.FETCH,
            method: (config && config.method) || 'GET',
            reqData: config && config.body,
            url: url,
            status: 0,
            statusText: err.name + err.message,
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

function replaceConsole(): void {
  if (!('console' in _global)) {
    return
  }
  //
  const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
  logType.forEach(function (level: string): void {
    if (!(level in _global.console)) {
      return
    }
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
function replaceHistory(): void {
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
    // ev.preventDefault() 不知道要不要配置这个可选项，阻止默认行为后，控制台就不会再报红色错误
    triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, ev)
  })
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
}

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
  // 不要你重写window.addEventLinstner直接用捕获的形式来获取全局的click、keypress
  // 重写window.EventTarget.prototype.addEventListener
  // const proto = EventTarget && EventTarget.prototype
  // if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
  //   return
  // }
  // replaceOld(proto, 'addEventListener', function (
  //   originalAddEventListener
  // ): (eventName: string, fn: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void {
  //   return function (this: any, eventName: string, fn: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
  //     switch (eventName) {
  //       case 'click':
  //         console.log(eventName)
  //         clickThrottle('dom', {
  //           category: 'click',
  //           data: this
  //         })
  //         break
  //       case 'keypress':
  //         keypressThrottle('dom', {
  //           category: 'keypress',
  //           data: this
  //         })
  //         break
  //       default:
  //         break
  //     }
  //     return originalAddEventListener.call(this, eventName, fn, options)
  //     // 考虑兼容性加上handleEvent 可以考虑删掉
  //     // if (fn && (fn as EventListenerObject).handleEvent) {
  //     //   switch (eventName) {
  //     //     case 'click':
  //     //       replaceOld(fn, 'handleEvent', function (originalHandleEvent) {
  //     //         return function (this: any, event: Event) {
  //     //           console.log(event.target)
  //     //           return originalHandleEvent.call(this, event)
  //     //         }
  //     //       })
  //     //       console.log('click', this)
  //     //       break
  //     //     case 'keypress':
  //     //       console.log('keypress', this)
  //     //       break
  //     //     default:
  //     //       break
  //     //   }
  //     // }
  //   }
  // })
}
