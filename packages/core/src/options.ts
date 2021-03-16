import { InitOptions } from '@mitojs/types'
import { generateUUID, toStringValidateOption, validateOption, _support, setSilentFlag, logger } from '@mitojs/utils'
import { breadcrumb } from './breadcrumb'
import { transportData } from './transportData'
export class Options {
  beforeAppAjaxSend: Function
  afterAppAjaxClose: Function
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  trackDsn: String

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
      enableTrack,
      trackDsn
    } = options
    validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend)
    validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId)
    validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
    toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', '[object RegExp]') &&
      (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp)
    toStringValidateOption(trackDsn, 'trackDsn', '[object String]') && (this.trackDsn = trackDsn)
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
