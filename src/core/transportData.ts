import { _support } from 'utils'
import { splitObjToQuery } from 'utils'
import { Queue } from './queue'
import { ReportDataType } from '@/common'
import createErrorId from '@/core/errorId'
import { SERVER_URL } from '@/config'
import { InitOptions } from '@/options'
import { BreadcrumbPushData, breadcrumb } from './breadcrumb'

export interface AuthInfo {
  apikey: string
  version: string
}

interface TransportDataType {
  authInfo: AuthInfo
  behavior: BreadcrumbPushData[]
  data: ReportDataType
  record?: any[]
}
/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求、可以断点续存（保存在localstorage），
 * 待开发：目前不需要断点续存，因为接口不是很多，只有错误时才触发，如果接口太多可以考虑合并接口、
 *
 * @class Transport
 */
export class TransportData {
  static img = new Image()
  private queue: Queue
  private beforeSend: unknown = null
  private configXhr: unknown = null
  private version = '0.0.0'
  private apikey = ''
  constructor(public url: string) {
    this.queue = new Queue()
  }
  imgRequest(data: Record<string, unknown>): void {
    TransportData.img.src = `${this.url}?${splitObjToQuery(data)}`
  }
  getRecord(): any[] {
    const recordData = _support.record
    if (recordData && Array.isArray(recordData) && recordData.length > 2) {
      return recordData
    }
    return []
  }
  xhrPost(data: ReportDataType): void {
    const requestFun = (): void => {
      if (typeof this.beforeSend === 'function') {
        data = this.beforeSend(data)
        if (!data) return
      }
      //screw IE
      if (typeof XMLHttpRequest === 'undefined') {
        return
      }
      const xhr = new XMLHttpRequest()
      xhr.open('POST', this.url)
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configXhr === 'function') {
        this.configXhr(xhr)
      }
      const errorId = createErrorId(data)
      if (!errorId) return
      data.errorId = errorId
      xhr.send(JSON.stringify(this.getTransportData(data)))
    }
    this.queue.addFn(requestFun)
  }
  getAuthInfo(): AuthInfo {
    return {
      version: this.version,
      apikey: this.apikey
    }
  }
  getTransportData(data: ReportDataType): TransportDataType {
    return {
      authInfo: this.getAuthInfo(),
      behavior: breadcrumb.getStack(),
      data,
      record: this.getRecord()
    }
  }
  isSdkTransportUrl(targetUrl: string): boolean {
    return targetUrl.includes(this.url)
  }
  bindOptions(options: InitOptions = {}): void {
    const { dsn, beforeSend, version, apikey, configXhr } = options
    apikey && (this.apikey = apikey)
    dsn && (this.url = dsn)
    version && (this.version = version)
    beforeSend && (this.beforeSend = beforeSend)
    configXhr && (this.configXhr = configXhr)
  }
}
const transportData = _support.transportData || (_support.transportData = new TransportData(SERVER_URL))
export { transportData }
