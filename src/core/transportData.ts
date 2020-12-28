import { _support, validateOption, logger, isArray } from '../utils/index'
import { splitObjToQuery, Queue } from '../utils/index'
import createErrorId from '../errorId'
import { SDK_NAME, SDK_VERSION, SERVER_URL } from '../config'
import { breadcrumb } from './breadcrumb'
import { InitOptions } from '../types/options'
import { AuthInfo, TransportDataType, ReportDataType } from '../types/transportData'

/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求、可以断点续存（保存在localstorage），
 * 待开发：目前不需要断点续存，因为接口不是很多，只有错误时才触发，如果接口太多可以考虑合并接口、
 *
 * ../class Transport
 */
export class TransportData {
  // static img = new Image()
  private queue: Queue
  private beforeDataReport: unknown = null
  private backTrackerId: InitOptions | unknown = null
  private configReportXhr: unknown = null
  private apikey = ''
  constructor(public url: string) {
    this.queue = new Queue()
  }
  // imgRequest(data: Record<string, unknown>): void {
  //   TransportData.img.src = `${this.url}?${splitObjToQuery(data)}`
  // }
  getRecord(): any[] {
    const recordData = _support.record
    if (recordData && isArray(recordData) && recordData.length > 2) {
      return recordData
    }
    return []
  }
  xhrPost(data: ReportDataType): void {
    const requestFun = (): void => {
      //screw IE
      if (typeof XMLHttpRequest === 'undefined') {
        return
      }
      if (typeof this.beforeDataReport === 'function') {
        data = this.beforeDataReport(data)
        // todo 加个判断 如果格式符合标准就不上传
        if (!data) return
      }
      const xhr = new XMLHttpRequest()
      xhr.open('POST', this.url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configReportXhr === 'function') {
        this.configReportXhr(xhr)
      }
      const errorId = createErrorId(data)
      if (!errorId) return
      data.errorId = errorId
      xhr.send(JSON.stringify(this.getTransportData(data)))
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
  send(data: ReportDataType | Record<string, unknown>): void {
    this.xhrPost(<ReportDataType>data)
  }
}
const transportData = _support.transportData || (_support.transportData = new TransportData(SERVER_URL))
export { transportData }
