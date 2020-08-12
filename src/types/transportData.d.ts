import { ERRORTYPES } from '@/common'
import { BreadcrumbPushData } from './breadcrumb'

export interface AuthInfo {
  apikey: string
  version: string
}

export interface TransportDataType {
  authInfo: AuthInfo
  behavior: BreadcrumbPushData[]
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
  level: number
  // ajax
  elapsedTime?: number
  request?: {
    httpType?: string
    method: string
    url: string
    data: any
  }
  response?: {
    status: number
    statusText: string
    description: string
  }
  // vue
  componentName?: string
  propsData?: any
  // logError 手动报错 MITO.log
  info?: string
}
