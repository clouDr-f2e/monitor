import { InitOptions } from '@/types/options'
import { toStringValidateOption, validateOption, _support } from 'utils'

export class Options {
  beforeAjaxSend: Function
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  constructor() {
    this.enableTraceId = false
  }
  bindOptions(options: InitOptions = {}): void {
    const { beforeAjaxSend, enableTraceId, filterXhrUrlRegExp, traceIdFieldName } = options
    validateOption(beforeAjaxSend, 'beforeAjaxSend', 'function') && (this.beforeAjaxSend = beforeAjaxSend)
    validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId)
    validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
  }
}

const options = _support.options || (_support.options = new Options())
export { options }
