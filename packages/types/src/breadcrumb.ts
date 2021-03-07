import { Severity } from '@mitojs/utils'
import { BREADCRUMBTYPES } from '@mitojs/shared'
import { ReportDataType } from './transportData'
import { Replace } from './replace'
import { IAnyObject, TNumStrObj } from './common'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BREADCRUMBTYPES
  // string for click dom
  data:
    | ReportDataType
    | Replace.IRouter
    | Replace.TriggerConsole
    | WxLifeCycleBreadcrumb
    | WxOnShareAppMessageBreadcrumb
    | WxRequestErrorBreadcrumb
    | TNumStrObj
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

export interface WxOnShareAppMessageBreadcrumb {
  path: string
  query: IAnyObject
  options: WechatMiniprogram.Page.IShareAppMessageOption
}

export interface WxOnTabItemTapBreadcrumb {
  path: string
  query: IAnyObject
  options: WechatMiniprogram.Page.ITabItemTapOption
}

export interface WxRequestErrorBreadcrumb {
  requestOptions: WechatMiniprogram.RequestOption
  errMsg: string
}
