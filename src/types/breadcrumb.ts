import { Severity } from '../utils/Severity'
import { BREADCRUMBTYPES } from '../common/common'
import { ReportDataType } from './transportData'
import { Replace } from './replace'
import { IAnyObject } from './common'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BREADCRUMBTYPES
  // string for click dom
  data: ReportDataType | string | Replace.IRouter | Replace.TriggerConsole | WxLifeCycleBreadcrumb
  /**
   * 分为user action、debug、http、
   */
  category?: string
  time?: number
  level: Severity
}

export interface WxLifeCycleBreadcrumb {
  path: string
  query: IAnyObject
  //  是否需要更多的属性
  // referrerInfo: IAnyObject
  // scene: number
  // shareTicket: any
}
