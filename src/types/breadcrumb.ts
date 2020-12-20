import { Severity } from '../utils/Severity'
import { BREADCRUMBTYPES } from '../common'
import { ReportDataType } from './transportData'
import { Replace } from './replace'

interface IRouteBreadcrumb {
  from: string
  to: string
}
export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BREADCRUMBTYPES
  // string for click dom
  data: ReportDataType | string | IRouteBreadcrumb | Replace.TriggerConsole
  /**
   * 分为user action、debug、http、
   */
  category?: string
  time?: number
  level: Severity
}
