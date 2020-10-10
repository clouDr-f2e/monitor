import { MITOHttp } from './replace'
import { BREADCRUMBTYPES, ERRORTYPES, globalVar, ERROR_TYPE_RE } from '../common'
import { resourceTransform, httpTransform } from './transformData'
import { transportData } from './transportData'
import { breadcrumb } from './breadcrumb'
import { getLocationHref, getTimestamp, isError, parseUrlToObj, extractErrorStack } from 'utils'
import { ReportDataType } from '../types/transportData'
import { Severity } from '../utils/Severity'
import { Replace } from '../types/replace'

export interface ResourceErrorTarget {
  src?: string
  href?: string
  localName?: string
}

const HandleEvents = {
  /**
   * 处理xhr、fetch回调
   */
  handleHttp(data: MITOHttp, type: BREADCRUMBTYPES): void {
    // todo 是否需要加接口超过两秒的判断
    // 401 表示未授权
    const isError = data.status >= 402 || data.status === 0
    breadcrumb.push({
      type,
      category: breadcrumb.getCategory(type),
      data,
      level: Severity.Info
    })
    if (isError) {
      breadcrumb.push({
        type,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
        data,
        level: Severity.Error
      })
      const result = httpTransform(data)
      transportData.send(result)
    } else {
      // todo 需要加个hook，传入参数为请求的响应体
      // data.responseText
    }
  },
  /**
   * 处理window的error的监听回到
   */
  handleError(errorEvent: ErrorEvent): void {
    const target = errorEvent.target as ResourceErrorTarget
    if (target.localName) {
      // 资源加载错误
      // 提取有用数据
      const data = resourceTransform(errorEvent.target as ResourceErrorTarget)
      // push到行为栈
      breadcrumb.push({
        type: BREADCRUMBTYPES.RESOURCE,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.RESOURCE),
        data,
        level: Severity.Error
      })
      // 上报错误
      return transportData.send(data)
    }
    // code error
    const { message, filename, lineno, colno, error } = errorEvent
    let result: ReportDataType
    if (error && isError(error)) {
      result = extractErrorStack(error, Severity.High)
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
        level: Severity.Normal,
        time: getTimestamp(),
        stack: [element]
      }
    }
    result.type = ERRORTYPES.JAVASCRIPT_ERROR
    breadcrumb.push({
      type: BREADCRUMBTYPES.CODE_ERROR,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
      data: result,
      level: Severity.Error
    })
    transportData.send(result)
  },
  handleHistory(data: { [key: string]: any }): void {
    const { from, to } = data
    const { relative: parsedFrom } = parseUrlToObj(from)
    const { relative: parsedTo } = parseUrlToObj(to)
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
      data: {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/'
      },
      level: Severity.Info
    })
  },
  handleHashchange(data: HashChangeEvent): void {
    const { oldURL, newURL } = data
    const { relative: from } = parseUrlToObj(oldURL)
    const { relative: to } = parseUrlToObj(newURL)
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
      data: {
        from,
        to
      },
      level: Severity.Info
    })
  },
  handleUnhandleRejection(ev: PromiseRejectionEvent): void {
    let data: ReportDataType = {
      type: ERRORTYPES.PROMISE_ERROR,
      message: JSON.stringify(ev.reason),
      url: getLocationHref(),
      name: ev.type,
      time: getTimestamp(),
      level: Severity.Normal
    }
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Normal)
      }
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
      data: data,
      level: Severity.Error
    })
    transportData.send(data)
  },
  handleConsole(data: Replace.TriggerConsole): void {
    if (globalVar.isLogAddBreadcrumb) {
      breadcrumb.push({
        type: BREADCRUMBTYPES.CONSOLE,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
        data,
        level: Severity.fromString(data.level)
      })
    }
  }
}

export { HandleEvents }
