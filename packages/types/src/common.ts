import { HTTPTYPE } from '@zyf2e/monitor-shared'

export interface IAnyObject {
  [key: string]: any
}

export interface ResourceErrorTarget {
  src?: string
  href?: string
  localName?: string
}

export interface MITOHttp {
  type: HTTPTYPE
  traceId?: string
  method?: string
  url?: string
  status?: number
  reqData?: any
  // statusText?: string
  sTime?: number
  elapsedTime?: number
  responseText?: any
  time?: number
  isSdkUrl?: boolean
  // for wx
  errMsg?: string
}

export interface MITOXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any
  mito_xhr?: MITOHttp
}

export interface ErrorStack {
  args: any[]
  func: string
  column: number
  line: number
  url: string
}

export interface IntegrationError {
  message: string
  name: string
  stack: ErrorStack[]
}

export type TNumStrObj = number | string | object

export interface LocalStorageValue<T = any> {
  expireTime?: number
  value: T | string
}
