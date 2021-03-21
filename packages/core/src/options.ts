import { InitOptions } from '@mitojs/types'
import { generateUUID, toStringValidateOption, validateOption, _support, setSilentFlag, logger } from '@mitojs/utils'
import { breadcrumb } from './breadcrumb'
import { transportData } from './transportData'
export class Options {
  beforeAppAjaxSend: Function = () => {}
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  // wx-mini
  appOnLauch: Function = () => {}
  appOnShow: Function = () => {}
  onPageNotFound: Function = () => {}
  appOnHide: Function = () => {}
  pageOnShow: Function = () => {}
  pageOnHide: Function = () => {}
  onShareAppMessage: Function = () => {}
  onShareTimeline: Function = () => {}
  onTabItemTap: Function = () => {}

  constructor() {
    this.enableTraceId = false
  }
  bindOptions(options: InitOptions = {}): void {
    const {
      beforeAppAjaxSend,
      enableTraceId,
      filterXhrUrlRegExp,
      traceIdFieldName,
      includeHttpUrlTraceIdRegExp,
      appOnLauch,
      appOnShow,
      appOnHide,
      pageOnShow,
      pageOnHide,
      onPageNotFound,
      onShareAppMessage,
      onShareTimeline,
      onTabItemTap
    } = options
    validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend)
    // wx-mini hooks
    validateOption(appOnLauch, 'appOnLauch', 'function') && (this.appOnLauch = appOnLauch)
    validateOption(appOnShow, 'appOnShow', 'function') && (this.appOnShow = appOnShow)
    validateOption(appOnHide, 'appOnHide', 'function') && (this.appOnHide = appOnHide)
    validateOption(pageOnShow, 'pageOnShow', 'function') && (this.pageOnShow = pageOnShow)
    validateOption(pageOnHide, 'pageOnHide', 'function') && (this.pageOnHide = pageOnHide)
    validateOption(onPageNotFound, 'onPageNotFound', 'function') && (this.onPageNotFound = onPageNotFound)
    validateOption(onShareAppMessage, 'onShareAppMessage', 'function') && (this.onShareAppMessage = onShareAppMessage)
    validateOption(onShareTimeline, 'onShareTimeline', 'function') && (this.onShareTimeline = onShareTimeline)
    validateOption(onTabItemTap, 'onTabItemTap', 'function') && (this.onTabItemTap = onTabItemTap)

    validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId)
    validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
    toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', '[object RegExp]') &&
      (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp)
  }
}

const options = _support.options || (_support.options = new Options())

export function setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void) {
  const { includeHttpUrlTraceIdRegExp, enableTraceId } = options
  if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
    const traceId = generateUUID()
    callback(options.traceIdFieldName, traceId)
  }
}

/**
 * init core methods
 * @param paramOptions
 */
export function initOptions(paramOptions: InitOptions = {}) {
  setSilentFlag(paramOptions)
  breadcrumb.bindOptions(paramOptions)
  logger.bindOptions(paramOptions.debug)
  transportData.bindOptions(paramOptions)
  options.bindOptions(paramOptions)
}

export { options }
