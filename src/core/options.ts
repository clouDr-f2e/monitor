import { InitOptions } from '../types/options'
import { generateUUID, toStringValidateOption, validateOption, _support } from 'utils'

export class Options {
  beforeAppAjaxSend: Function
  afterAppAjaxClose: Function
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  filterHttpTraceIdRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  constructor() {
    this.enableTraceId = false
  }
  bindOptions(options: InitOptions = {}): void {
    const { beforeAppAjaxSend, enableTraceId, filterXhrUrlRegExp, traceIdFieldName, filterHttpTraceIdRegExp } = options
    validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend)
    validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId)
    validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
    toStringValidateOption(filterHttpTraceIdRegExp, 'filterHttpTraceIdRegExp', '[object RegExp]') && (this.filterHttpTraceIdRegExp = filterHttpTraceIdRegExp)
  }
}

const options = _support.options || (_support.options = new Options())

export function setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void) {
  const { filterHttpTraceIdRegExp, enableTraceId } = options
  if (enableTraceId) {
    const isNotFilter = filterHttpTraceIdRegExp ? true : !filterHttpTraceIdRegExp.test(httpUrl)
    if (isNotFilter) {
      const traceId = generateUUID()
      callback(options.traceIdFieldName, traceId)
    }
  }
}

export { options }
