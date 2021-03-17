import { ERRORTYPES } from '@mitojs/shared'
import { BreadcrumbPushData } from './breadcrumb'
import { EActionType } from './track'

export interface AuthInfo {
  apikey: string
  sdkVersion: string
  sdkName: string
  trackerId: string
}

export interface TransportDataType {
  authInfo: AuthInfo
  breadcrumb: BreadcrumbPushData[]
  data: ReportDataType
  record?: any[]
}

export interface ReportDataType {
  type?: ERRORTYPES
  message?: string
  url: string
  name?: string
  stack?: any
  time?: number
  errorId?: number
  level: string
  // ajax
  elapsedTime?: number
  request?: {
    httpType?: string
    traceId?: string
    method: string
    url: string
    data: any
  }
  response?: {
    status: number
    data: string
  }
  // vue
  componentName?: string
  propsData?: any
  // logError 手动报错 MITO.log
  customTag?: string
}

export interface TrackReportData {
  // uuid
  id: string
  // 埋点code 一般由人为传进来，可以自定义规范
  trackId: string
  // 埋点类型
  actionType: EActionType
  // 埋点开始时间
  startTime: number
  // 埋点停留时间
  durationTime: number
  // 本地上报时间,用于校验时间 Date.now()  和服务器时间作比较
  customTime: number
  // debug 为true 则投递到日志库  为false 投递到埋点库 定制时手动拼上
  // libVersion sdk 版本 定制时手动拼上
  // libType sdk 类型 定制时手动拼上
}

export function isReportDataType(data: ReportDataType | TrackReportData): data is ReportDataType {
  return (<ReportDataType>data).errorId !== undefined
}
