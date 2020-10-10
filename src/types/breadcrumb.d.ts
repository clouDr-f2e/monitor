import { Severity } from '../utils/Severity'
import { BREADCRUMBTYPES } from '../common'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BREADCRUMBTYPES
  data: any
  /**
   * 分为user action、debug、http、
   */
  category?: string
  time?: number
  level: Severity
}
