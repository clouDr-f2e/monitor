import { _support, validateOption, logger, isBrowserEnv, isWxMiniEnv, variableTypeDetection, Queue } from '@mitojs/utils'
import { createErrorId } from './errorId'
import { SDK_NAME, SDK_VERSION, SERVER_URL } from '@mitojs/shared'
import { breadcrumb } from './breadcrumb'
import { AuthInfo, TransportDataType, ReportDataType, EMethods, InitOptions } from '@mitojs/types'

/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求、可以断点续存（保存在localstorage），
 * 待开发：目前不需要断点续存，因为接口不是很多，只有错误时才触发，如果接口太多可以考虑合并接口、
 *
 * ../class Transport
 */
export class TransportData {
  // static img = new Image()
  queue: Queue
  beforeDataReport: unknown = null
  backTrackerId: InitOptions | unknown = null
  configReportXhr: unknown = null
  apikey = ''
  constructor(public url: string) {
    this.queue = new Queue()
  }
  // imgRequest(data: Record<string, unknown>): void {
  //   TransportData.img.src = `${this.url}?${splitObjToQuery(data)}`
  // }
  getRecord(): any[] {
    const recordData = _support.record
    if (recordData && variableTypeDetection.isArray(recordData) && recordData.length > 2) {
      return recordData
    }
    return []
  }
  async beforePost(data: ReportDataType) {
    const errorId = createErrorId(data, this.apikey)
    if (!errorId) return false
    data.errorId = errorId
    let transportData = this.getTransportData(data)
    if (typeof this.beforeDataReport === 'function') {
      transportData = await this.beforeDataReport(transportData)
      if (!transportData) return false
    }
    return JSON.stringify(transportData)
  }
  async xhrPost(data: ReportDataType) {
    const result = await this.beforePost(data)
    if (!result) return
    const requestFun = (): void => {
      const xhr = new XMLHttpRequest()
      xhr.open(EMethods.Post, this.url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configReportXhr === 'function') {
        this.configReportXhr(xhr)
      }
      xhr.send(result)
    }
    this.queue.addFn(requestFun)
  }
  async wxPost(data: ReportDataType) {
    const result = await this.beforePost(data)
    if (!result) return
    const requestFun = (): void => {
      wx.request({
        method: 'POST',
        header: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        url: this.url,
        data: result
      })
    }
    this.queue.addFn(requestFun)
  }
  getAuthInfo(): AuthInfo {
    const trackerId = this.getTrackerId()
    return {
      trackerId: String(trackerId),
      sdkVersion: SDK_VERSION,
      sdkName: SDK_NAME,
      apikey: this.apikey
    }
  }
  getApikey() {
    return this.apikey
  }
  getTrackerId(): string | number {
    if (typeof this.backTrackerId === 'function') {
      const trackerId = this.backTrackerId()
      if (typeof trackerId === 'string' || typeof trackerId === 'number') {
        return trackerId
      } else {
        logger.error(`trackerId:${trackerId} 期望 string 或 number 类型，但是传入 ${typeof trackerId}`)
      }
    }
    return ''
  }
  getTransportData(data: ReportDataType): TransportDataType {
    return {
      authInfo: this.getAuthInfo(),
      breadcrumb: breadcrumb.getStack(),
      data,
      record: this.getRecord()
    }
  }
  isSdkTransportUrl(targetUrl: string): boolean {
    return targetUrl.indexOf(this.url) !== -1
  }
  bindOptions(options: InitOptions = {}): void {
    const { dsn, beforeDataReport, apikey, configReportXhr, backTrackerId } = options
    validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey)
    validateOption(dsn, 'dsn', 'string') && (this.url = dsn)
    validateOption(beforeDataReport, 'beforeDataReport', 'function') && (this.beforeDataReport = beforeDataReport)
    validateOption(configReportXhr, 'configReportXhr', 'function') && (this.configReportXhr = configReportXhr)
    validateOption(backTrackerId, 'backTrackerId', 'function') && (this.backTrackerId = backTrackerId)
  }
  send(data: ReportDataType) {
    if (isBrowserEnv) {
      return this.xhrPost(data)
    }
    if (isWxMiniEnv) {
      return this.wxPost(data)
    }
  }
  // for track
  // trackSend(data: ) {

  // }
}
const transportData = _support.transportData || (_support.transportData = new TransportData(SERVER_URL))
export { transportData }
