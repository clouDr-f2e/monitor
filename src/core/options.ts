import { InitOptions } from '../types/options'
import { toStringValidateOption, validateOption, _support } from 'utils'

export class Options {
  beforeAppAjaxSend: Function
  afterAppAjaxClose: Function
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  constructor() {
    this.enableTraceId = false
  }
  bindOptions(options: InitOptions = {}): void {
    const { beforeAppAjaxSend, enableTraceId, filterXhrUrlRegExp, traceIdFieldName } = options
    validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend)
    // validateOption(afterAppAjaxClose, 'afterAppAjaxClose', 'function') && (this.afterAppAjaxClose = afterAppAjaxClose)
    validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId)
    validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
  }
}

const options = _support.options || (_support.options = new Options())
export { options }
