import {
  _global,
  on,
  getTimestamp,
  replaceOld,
  throttle,
  getLocationHref,
  isExistProperty,
  variableTypeDetection,
  supportsHistory
} from '@mitojs/utils'
import { transportData, options, setTraceId, triggerHandlers, ReplaceHandler, subscribeEvent } from '@mitojs/core'
import { EMethods, MITOHttp, MITOXMLHttpRequest } from '@mitojs/types'
import { voidFun, EVENTTYPES, HTTPTYPE, HTTP_CODE } from '@mitojs/shared'

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
  if (!subscribeEvent(handler)) return
  replace(handler.type as EVENTTYPES)
}

function xhrReplace(): void {
  if (!('XMLHttpRequest' in _global)) {
    return
  }
  const originalXhrProto = XMLHttpRequest.prototype
  replaceOld(originalXhrProto, 'open', (originalOpen: voidFun): voidFun => {
    return function (this: MITOXMLHttpRequest, ...args: any[]): void {
      this.mito_xhr = {
        method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
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
  })
  replaceOld(originalXhrProto, 'send', (originalSend: voidFun): voidFun => {
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
        this.mito_xhr.time = this.mito_xhr.sTime
        this.mito_xhr.status = status
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          this.mito_xhr.responseText = typeof response === 'object' ? JSON.stringify(response) : response
        }
        this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime
        triggerHandlers(EVENTTYPES.XHR, this.mito_xhr)
      })
      originalSend.apply(this, args)
    }
  })
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
            time: sTime
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
            time: sTime
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
// last time route
let lastHref: string
lastHref = getLocationHref()
function historyReplace(): void {
  if (!supportsHistory()) return
  const oldOnpopstate = _global.onpopstate
  _global.onpopstate = function (this: WindowEventHandlers, ...args: any[]): any {
    const to = getLocationHref()
    const from = lastHref
    lastHref = to
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

function domReplace(): void {
  if (!('document' in _global)) return
  const clickThrottle = throttle(triggerHandlers, options.throttleDelayTime)
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
}
