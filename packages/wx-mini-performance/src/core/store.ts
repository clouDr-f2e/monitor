import { noop, getPageUrl, getDeviceId } from '../utils'
import { generateUUID, validateOption } from '@mitojs/utils'
import { WxPerformancePushType } from '../constant'

class Store {
  appId: string
  report: (data: WxPerformanceData) => void
  immediately?: boolean
  maxBreadcrumbs?: number
  stack: Array<WxPerformanceObj>

  // wx
  getBatteryInfo: () => WechatMiniprogram.GetBatteryInfoSyncResult
  getNetworkType: <T extends WechatMiniprogram.GetNetworkTypeOption = WechatMiniprogram.GetNetworkTypeOption>(
    option?: T
  ) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetNetworkTypeOption>
  systemInfo: WechatMiniprogram.SystemInfo

  constructor(options: WxPerformanceInitOptions) {
    const { appId, report, maxBreadcrumbs, immediately } = options
    validateOption(appId, 'appId', 'string') && (this.appId = appId)
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs)
    validateOption(immediately, 'immediately', 'boolean') && (this.immediately = immediately)
    this.report = validateOption(report, 'report', 'function') ? report : noop
    this.stack = []
  }

  async _pushData(data: Array<WxPerformanceObj>) {
    if (this.immediately) {
      let item = await this._createPerformanceData(data)
      this.report(item)
      return
    }
    this.stack = this.stack.concat(data)
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.reportLeftData()
    }
  }

  async reportLeftData() {
    let item = await this._createPerformanceData(this.stack)
    this.report(item)
    this.stack = []
  }

  _getSystemInfo(): WechatMiniprogram.SystemInfo {
    !this.systemInfo && (this.systemInfo = wx.getSystemInfoSync())
    return this.systemInfo
  }
  async _getNetworkType(): Promise<WxNetworkType> {
    let nk = { networkType: 'none', errMsg: '' } as WechatMiniprogram.GetNetworkTypeSuccessCallbackResult
    try {
      nk = await this.getNetworkType()
    } catch (err) {
      console.warn(`getNetworkType err = `, err)
    }
    return nk.networkType
  }

  async _createPerformanceData(data: Array<WxPerformanceObj>): Promise<WxPerformanceData> {
    const networkType = await this._getNetworkType()
    const date = new Date()

    return {
      appId: this.appId,
      timestamp: date.getTime(),
      time: date.toLocaleString(),
      uuid: generateUUID(),
      deviceId: getDeviceId(),
      networkType: networkType,
      batteryLevel: this.getBatteryInfo().level,
      systemInfo: this._getSystemInfo(),
      page: getPageUrl(),
      data: data
    }
  }

  push(type: WxPerformancePushType, data: WechatMiniprogram.OnMemoryWarningCallbackResult | Array<WxPerformanceEntryData>) {
    switch (type) {
      case WxPerformancePushType.MEMORY_WARNING:
        this.handleMemoryWarning(data as WechatMiniprogram.OnMemoryWarningCallbackResult)
        break
      case WxPerformancePushType.WX_PERFORMANCE:
        this.handleWxPerformance(data as Array<WxPerformanceEntryData>)
      default:
        break
    }
  }

  // 内存警告会立即上报
  async handleMemoryWarning(data: WechatMiniprogram.OnMemoryWarningCallbackResult) {
    let d = await this._createPerformanceData([{ ...data, type: WxPerformancePushType.MEMORY_WARNING, timestamp: Date.now() }])
    this.report(d)
  }

  async handleWxPerformance(data: Array<WxPerformanceEntryData> = []) {
    let item: Array<WxPerformanceObj> = data.map((d) => {
      d.type = WxPerformancePushType.WX_PERFORMANCE
      d.timestamp = Date.now()
      return d
    })
    this._pushData(item)
  }
}

export default Store
