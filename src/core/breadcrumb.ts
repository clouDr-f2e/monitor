import { globalVar, BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '@/common'
import { logger, validateOption, getTimestamp } from 'utils'
import { _support } from '@/utils/global'
import { BreadcrumbPushData } from '@/types/breadcrumb'
import { InitOptions } from '@/types/options'

export class Breadcrumb {
  private maxBreadcrumbs = 10
  private beforeBreadcrumb: unknown = null
  private stack: BreadcrumbPushData[] = []
  constructor() {}
  /**
   * 添加用户行为栈
   *
   * @param {BreadcrumbPushData} data
   * @memberof Breadcrumb
   */
  push(data: BreadcrumbPushData): void {
    if (typeof this.beforeBreadcrumb === 'function') {
      let result: BreadcrumbPushData = null
      // 如果用户输入console，并且logger是打开的会造成无限递归，
      // 应该加入一个开关，执行这个函数前，把监听console的行为关掉
      globalVar.isLogAddBreadcrumb = false
      result = this.beforeBreadcrumb(this, data)
      globalVar.isLogAddBreadcrumb = true
      if (result) {
        this.immediatePush(result)
      }
      return
    }
    this.immediatePush(data)
  }
  immediatePush(data: BreadcrumbPushData): void {
    data.time = getTimestamp()
    data.category = this.setCategory(data.type)
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
  setCategory(type: BREADCRUMBTYPES) {
    switch (type) {
      case BREADCRUMBTYPES.XHR:
      case BREADCRUMBTYPES.FETCH:
        return BREADCRUMBCATEGORYS.HTTP
      case BREADCRUMBTYPES.CLICK:
      case BREADCRUMBTYPES.ROUTE:
      case BREADCRUMBTYPES.CUSTOMER:
        return BREADCRUMBCATEGORYS.USER
      case BREADCRUMBTYPES.CONSOLE:
        return BREADCRUMBCATEGORYS.DEBUG
      case BREADCRUMBTYPES.UNHANDLEDREJECTION:
      case BREADCRUMBTYPES.CODE_ERROR:
      default:
        return BREADCRUMBCATEGORYS.EXCEPTION
    }
  }
  bindOptions(options: InitOptions = {}): void {
    const { maxBreadcrumbs, beforeBreadcrumb } = options
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs)
    validateOption(beforeBreadcrumb, 'beforeBreadcrumb', 'function') && (this.beforeBreadcrumb = beforeBreadcrumb)
  }
}
const breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb())
export { breadcrumb }
