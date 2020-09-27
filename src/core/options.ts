import { InitOptions } from '@/types/options'
import { validateOption, _support } from 'utils'

export class Options {
  beforeAjaxSend: any = null
  constructor() {}
  bindOptions(options: InitOptions = {}): void {
    const { beforeAjaxSend } = options
    validateOption(beforeAjaxSend, 'beforeAjaxSend', 'function') && (this.beforeAjaxSend = beforeAjaxSend)
  }
}

const options = _support.options || (_support.options = new Options())
export { options }
