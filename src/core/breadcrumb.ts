import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '../common'
import { logger, validateOption, getTimestamp, slientConsoleScope } from 'utils'
import { _support } from '../utils/global'
import { BreadcrumbPushData } from '../types/breadcrumb'
import { InitOptions } from '../types/options'

export class Breadcrumb {
  private maxBreadcrumbs = 10
  private beforePushBreadcrumb: unknown = null
  private stack: BreadcrumbPushData[] = []
  constructor() {}
  /**
   * 添加用户行为栈
   *
   * ../param {BreadcrumbPushData} data
   * ../memberof Breadcrumb
   */
  push(data: BreadcrumbPushData): void {
    if (typeof this.beforePushBreadcrumb === 'function') {
      let result: BreadcrumbPushData = null
      // 如果用户输入console，并且logger是打开的会造成无限递归，
      // 应该加入一个开关，执行这个函数前，把监听console的行为关掉
      slientConsoleScope(() => {
        result = (this.beforePushBreadcrumb as Function)(this, data)
      })
      if (result) {
        this.immediatePush(result)
      }
      return
    }
    this.immediatePush(data)
  }
  immediatePush(data: BreadcrumbPushData): void {
    data.time = getTimestamp()
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.shift()
    }
    this.stack.push(data)
    logger.log(this.stack)
  }
  shift(): boolean {
    return this.stack.shift() !== undefined
  }
  getStack(): BreadcrumbPushData[] {
    return this.stack
  }
  getCategory(type: BREADCRUMBTYPES) {
    switch (type) {
      case BREADCRUMBTYPES.XHR:
      case BREADCRUMBTYPES.FETCH:
        return BREADCRUMBCATEGORYS.HTTP
      case BREADCRUMBTYPES.CLICK:
      case BREADCRUMBTYPES.ROUTE:
        return BREADCRUMBCATEGORYS.USER
      case BREADCRUMBTYPES.CUSTOMER:
      case BREADCRUMBTYPES.CONSOLE:
        return BREADCRUMBCATEGORYS.DEBUG
      case BREADCRUMBTYPES.UNHANDLEDREJECTION:
      case BREADCRUMBTYPES.CODE_ERROR:
      case BREADCRUMBTYPES.RESOURCE:
      case BREADCRUMBTYPES.VUE:
      default:
        return BREADCRUMBCATEGORYS.EXCEPTION
    }
  }
  bindOptions(options: InitOptions = {}): void {
    const { maxBreadcrumbs, beforePushBreadcrumb } = options
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs)
    validateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'function') && (this.beforePushBreadcrumb = beforePushBreadcrumb)
  }
}
const breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb())
export { breadcrumb }
