import { Severity } from '@mitojs/utils'
import { BREADCRUMBTYPES } from '@mitojs/shared'
import { ReportDataType } from './transportData'
import { Replace } from './replace'
import { TNumStrObj } from './common'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BREADCRUMBTYPES
  // string for click dom
  data: ReportDataType | Replace.IRouter | Replace.TriggerConsole | TNumStrObj
  /**
   * 分为user action、debug、http、
   */
  category?: string
  time?: number
  level: Severity
}
