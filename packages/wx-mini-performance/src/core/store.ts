import { WxPerformancePushType, WxPerformanceType } from '../constant'
import { noop, getPageUrl } from '../utils'
import { generateUUID, validateOption } from '@mitojs/utils'

class Store {
  appId: string
  report: (data: Array<WxPerformanceData>) => void
  immediately?: boolean
  maxBreadcrumbs?: number
  stack: Array<WxPerformanceData>

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

  _pushData(data: WxPerformanceData) {
    if (this.immediately) {
      this.report([data])
      return
    }
    this.stack.push(data)
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.reportLeftData()
    }
  }

  reportLeftData() {
    this.report([...this.stack])
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

  async _createPerformanceData(type: WxPerformanceDataType, data): Promise<WxPerformanceData> {
    const networkType = await this._getNetworkType()

    return {
      type: type,
      appId: this.appId,
      timestamp: Date.now(),
      uuid: generateUUID(),
      networkType: networkType,
      batteryLevel: this.getBatteryInfo().level,
      systemInfo: this._getSystemInfo(),
      page: getPageUrl(),
      data: data
    }
  }

  push(type: WxPerformancePushType, data) {
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
    let d = await this._createPerformanceData(WxPerformanceType.MEMORY_WARNING, data)
    this.report([d])
  }

  async handleWxPerformance(data: Array<WxPerformanceEntryData> = []) {
    data.map(async (entry) => {
      let pData = await this._createPerformanceData(entry.entryType as WxPerformanceDataType, entry)
      this._pushData(pData)
    })
  }
}

export default Store
