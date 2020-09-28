import { InitOptions } from '@/types/options'
import { validateOption, _support } from 'utils'

export class Options {
  beforeAjaxSend: any = null
  disableTraceId = false
  constructor() {
    this.disableTraceId = false
  }
  bindOptions(options: InitOptions = {}): void {
    const { beforeAjaxSend, disableTraceId } = options
    validateOption(beforeAjaxSend, 'beforeAjaxSend', 'function') && (this.beforeAjaxSend = beforeAjaxSend)
    validateOption(disableTraceId, 'disableTraceId', 'boolean') && (this.disableTraceId = disableTraceId)
  }
}

const options = _support.options || (_support.options = new Options())
export { options }
