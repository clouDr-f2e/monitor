import { _support, validateOption, logger, isBrowserEnv, isWxMiniEnv, variableTypeDetection, Queue, isEmpty } from '@mitojs/utils'
import { createErrorId } from './errorId'
import { SDK_NAME, SDK_VERSION } from '@mitojs/shared'
import { breadcrumb } from './breadcrumb'
import { AuthInfo, TransportDataType, EMethods, InitOptions, isReportDataType, DeviceInfo, FinalReportType } from '@mitojs/types'
/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求、可以断点续存（保存在localstorage），
 * 待开发：目前不需要断点续存，因为接口不是很多，只有错误时才触发，如果接口太多可以考虑合并接口、
 *
 * ../class Transport
 */
export class TransportData {
  queue: Queue
  beforeDataReport: unknown = null
  backTrackerId: InitOptions | unknown = null
  configReportXhr: unknown = null
  configReportUrl: unknown = null
  apikey = ''
  trackKey = ''
  errorDsn = ''
  trackDsn = ''
  constructor() {
    this.queue = new Queue()
  }
  // imgRequest(data: Record<string, unknown>, url: string): void {
  //   let img = new Image()
  //   img.src = `${url}?${splitObjToQuery(data)}`
  //   img = null
  // }
  getRecord(): any[] {
    const recordData = _support.record
    if (recordData && variableTypeDetection.isArray(recordData) && recordData.length > 2) {
      return recordData
    }
    return []
  }
  getDeviceInfo(): DeviceInfo | any {
    return _support.deviceInfo || {}
  }
  async beforePost(data: FinalReportType) {
    if (isReportDataType(data)) {
      const errorId = createErrorId(data, this.apikey)
      if (!errorId) return false
      data.errorId = errorId
    }
    let transportData = this.getTransportData(data)
    if (typeof this.beforeDataReport === 'function') {
      transportData = await this.beforeDataReport(transportData)
      if (!transportData) return false
    }
    return transportData
  }
  async xhrPost(data: any, url: string) {
    const requestFun = (): void => {
      const xhr = new XMLHttpRequest()
      xhr.open(EMethods.Post, url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configReportXhr === 'function') {
        this.configReportXhr(xhr)
      }
      xhr.send(JSON.stringify(data))
    }
    this.queue.addFn(requestFun)
  }
  async wxPost(data: any, url: string) {
    const requestFun = (): void => {
      wx.request({
        method: 'POST',
        header: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        url,
        data: JSON.stringify(data)
      })
    }
    this.queue.addFn(requestFun)
  }
  getAuthInfo(): AuthInfo {
    const trackerId = this.getTrackerId()
    const result: AuthInfo = {
      trackerId: String(trackerId),
      sdkVersion: SDK_VERSION,
      sdkName: SDK_NAME
    }
    this.apikey && (result.apikey = this.apikey)
    this.trackKey && (result.trackKey = this.trackKey)
    return result
  }
  getApikey() {
    return this.apikey
  }
  getTrackKey() {
    return this.trackKey
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
  getTransportData(data: FinalReportType): TransportDataType {
    return {
      authInfo: this.getAuthInfo(),
      breadcrumb: breadcrumb.getStack(),
      data,
      record: this.getRecord(),
      deviceInfo: this.getDeviceInfo()
    }
  }
  isSdkTransportUrl(targetUrl: string): boolean {
    let isSdkDsn = false
    if (this.errorDsn && targetUrl.indexOf(this.errorDsn) !== -1) {
      isSdkDsn = true
    }
    if (this.trackDsn && targetUrl.indexOf(this.trackDsn) !== -1) {
      isSdkDsn = true
    }
    return isSdkDsn
  }

  bindOptions(options: InitOptions = {}): void {
    const { dsn, beforeDataReport, apikey, configReportXhr, backTrackerId, trackDsn, trackKey, configReportUrl } = options
    validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey)
    validateOption(trackKey, 'trackKey', 'string') && (this.trackKey = trackKey)
    validateOption(dsn, 'dsn', 'string') && (this.errorDsn = dsn)
    validateOption(trackDsn, 'trackDsn', 'string') && (this.trackDsn = trackDsn)
    validateOption(beforeDataReport, 'beforeDataReport', 'function') && (this.beforeDataReport = beforeDataReport)
    validateOption(configReportXhr, 'configReportXhr', 'function') && (this.configReportXhr = configReportXhr)
    validateOption(backTrackerId, 'backTrackerId', 'function') && (this.backTrackerId = backTrackerId)
    validateOption(configReportUrl, 'configReportUrl', 'function') && (this.configReportUrl = configReportUrl)
  }
  /**
   * 监控错误上报的请求函数
   * @param data 错误上报数据格式
   * @returns
   */
  async send(data: FinalReportType) {
    let dsn = ''
    if (isReportDataType(data)) {
      dsn = this.errorDsn
      if (isEmpty(dsn)) {
        logger.error('dsn为空，没有传入监控错误上报的dsn地址，请在init中传入')
        return
      }
    } else {
      dsn = this.trackDsn
      if (isEmpty(dsn)) {
        logger.error('trackDsn为空，没有传入埋点上报的dsn地址，请在init中传入')
        return
      }
    }
    const result = await this.beforePost(data)
    if (!result) return
    if (typeof this.configReportUrl === 'function') {
      dsn = this.configReportUrl(result, dsn)
      if (!dsn) return
    }
    if (isBrowserEnv) {
      return this.xhrPost(result, dsn)
    }
    if (isWxMiniEnv) {
      return this.wxPost(result, dsn)
    }
  }
}
const transportData = _support.transportData || (_support.transportData = new TransportData())
export { transportData }
