import { HTTPTYPE } from '../common/constant'

export interface IAnyObject {
  [key: string]: any
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
