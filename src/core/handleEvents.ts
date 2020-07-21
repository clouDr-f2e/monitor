import { MITOHttp } from './replace'
import { BREADCRUMBTYPES, ERRORTYPES, globalVar, ERRORLEVELS, ERROR_TYPE_RE } from '@/common'
import { resourceTransform, httpTransform } from './transformData'
import { transportData } from './transportData'
import { breadcrumb } from './breadcrumb'
import { getLocationHref, getTimestamp, isError, parseUrlToObj, extractErrorStack } from 'utils'
import { ReportDataType } from '@/types/transportData'

export interface ResourceErrorTarget {
  src?: string
  href?: string
  localName?: string
}

const HandleEvents = {
  handleHttp(data: MITOHttp, type: string): void {
    breadcrumb.push({
      type,
      data
    })
    if (data.status >= 400 || data.status === 0) {
      transportData.xhrPost(httpTransform(data))
    } else {
      // todo 需要加个hook，传入参数为请求的响应体
      // data.responseText
    }
  },
  handleError(errorEvent: ErrorEvent): void {
    const target = errorEvent.target as ResourceErrorTarget
    if (target.localName) {
      // resource error
      const data: ReportDataType = resourceTransform(errorEvent.target as ResourceErrorTarget)
      breadcrumb.push({
        type: BREADCRUMBTYPES.RESOURCE,
        data
      })
      return transportData.xhrPost(data)
    }
    // code error
    const { message, filename, lineno, colno, error } = errorEvent
    let result: ReportDataType
    if (error && isError(error)) {
      result = extractErrorStack(error, ERRORLEVELS.HIGH)
    } else {
      let name: string | ERRORTYPES = ERRORTYPES.UNKNOWN
      const url = filename || getLocationHref()
      let msg = message
      const matches = message.match(ERROR_TYPE_RE)
      if (matches[1]) {
        name = matches[1]
        msg = matches[2]
      }
      const element = {
        url,
        func: ERRORTYPES.UNKNOWN_FUNCTION,
        args: ERRORTYPES.UNKNOWN,
        line: lineno,
        col: colno
      }
      result = {
        url,
        name,
        message: msg,
        level: ERRORLEVELS.NORMAL,
        time: getTimestamp(),
        stack: [element]
      }
    }
    result.type = ERRORTYPES.JAVASCRIPT_ERROR
    breadcrumb.push({
      type: BREADCRUMBTYPES.CODE_ERROR,
      data: result
    })
    transportData.xhrPost(result)
  },
  handleHistory(data: { [key: string]: any }): void {
    const { from, to } = data
    const { relative: parsedFrom } = parseUrlToObj(from)
    const { relative: parsedTo } = parseUrlToObj(to)
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      data: {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/'
      }
    })
  },
  handleHashchange(data: HashChangeEvent): void {
    const { oldURL, newURL } = data
    const { relative: from } = parseUrlToObj(oldURL)
    const { relative: to } = parseUrlToObj(newURL)
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      data: {
        from,
        to
      }
    })
  },
  handleUnhandleRejection(ev: PromiseRejectionEvent): void {
    let data: ReportDataType = {
      type: ERRORTYPES.PROMISE_ERROR,
      message: JSON.stringify(ev.reason),
      url: getLocationHref(),
      name: ev.type,
      time: getTimestamp(),
      level: ERRORLEVELS.NORMAL
    }
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, ERRORLEVELS.NORMAL)
      }
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
      data: data
    })
    transportData.xhrPost(data)
  },
  handleConsole(data: Record<string, unknown>): void {
    if (globalVar.isLogAddBreadcrumb) {
      breadcrumb.push({
        type: BREADCRUMBTYPES.CONSOLE,
        data
      })
    }
  }
}

export { HandleEvents }
