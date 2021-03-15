import { IAnyObject } from '@mitojs/types'
/**
 * 微信小程序的设备信息
 */
export interface DeviceInfo {
  netType: String
  clientWidth: Number
  clientHeight: Number
  radio: Number
}

export interface MiniRoute {
  from: string
  to: string
  isFail?: boolean
  message?: string
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

export interface WxLifeCycleBreadcrumb {
  path: string
  query: IAnyObject
  //  是否需要更多的属性
  // referrerInfo: IAnyObject
  // scene: number
  // shareTicket: any
}
