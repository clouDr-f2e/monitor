import { noop, getPageUrl, getDeviceId } from '../utils'
import { generateUUID, validateOption, toStringValidateOption } from '@mitojs/utils'
import { WxPerformanceDataType, WxPerformanceItemType } from '../constant'
import Event from './event'

class Store extends Event {
  appId: string
  report: (data: Array<WxPerformanceData>) => void
  immediately?: boolean
  ignoreUrl?: RegExp
  maxBreadcrumbs?: number
  stack: Array<WxPerformanceData>

  // wx
  getBatteryInfo: () => WechatMiniprogram.GetBatteryInfoSyncResult
  getNetworkType: <T extends WechatMiniprogram.GetNetworkTypeOption = WechatMiniprogram.GetNetworkTypeOption>(
    option?: T
  ) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetNetworkTypeOption>
  systemInfo: WechatMiniprogram.SystemInfo

  wxLaunchTime: number

  __firstAction: boolean = false

  constructor(options: WxPerformanceInitOptions) {
    super()
    const { appId, report, maxBreadcrumbs, immediately, ignoreUrl } = options
    validateOption(appId, 'appId', 'string') && (this.appId = appId)
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs)
    toStringValidateOption(ignoreUrl, 'ignoreUrl', '[object RegExp]') && (this.ignoreUrl = ignoreUrl)
    validateOption(immediately, 'immediately', 'boolean') && (this.immediately = immediately)

    this.report = validateOption(report, 'report', 'function') ? report : noop
    this.stack = []
  }

  async _pushData(data: Array<WxPerformanceData>) {
    if (this.immediately) {
      this.report(data)
      return
    }
    this.stack = this.stack.concat(data)
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.reportLeftData()
    }
  }

  async reportLeftData() {
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

  async _createPerformanceData(type: WxPerformanceDataType, item: Array<WxPerformanceItem>): Promise<WxPerformanceData> {
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
      wxLaunch: this.wxLaunchTime,
      page: getPageUrl(),
      type: type,
      item: item
    }
  }

  push(type: WxPerformanceDataType, data: WxPerformanceItem | Array<WxPerformanceItem>) {
    switch (type) {
      case WxPerformanceDataType.WX_LIFE_STYLE:
      case WxPerformanceDataType.WX_NETWORK:
        this.simpleHandle(type, data as WxPerformanceItem)
        break
      case WxPerformanceDataType.MEMORY_WARNING:
        this.handleMemoryWarning(data as WechatMiniprogram.OnMemoryWarningCallbackResult)
        break
      case WxPerformanceDataType.WX_PERFORMANCE:
        this.handleWxPerformance(data as Array<WxPerformanceItem>)
        break
      case WxPerformanceDataType.WX_USER_ACTION:
        this.handleWxAction(data as WxPerformanceItem)
      default:
        break
    }
  }

  async simpleHandle(type: WxPerformanceDataType, data: WxPerformanceItem) {
    let d = await this._createPerformanceData(type as WxPerformanceDataType, [data])
    this._pushData([d])
  }

  // 内存警告会立即上报
  async handleMemoryWarning(data: WechatMiniprogram.OnMemoryWarningCallbackResult) {
    let d = await this._createPerformanceData(WxPerformanceDataType.MEMORY_WARNING, [
      { ...data, itemType: WxPerformanceItemType.MemoryWarning, timestamp: Date.now() }
    ])
    this.report([d])
  }

  async handleWxPerformance(data: Array<WxPerformanceItem> = []) {
    let _data: Array<WxPerformanceItem> = data.map((d) => {
      d.itemType = WxPerformanceItemType.Performance
      d.timestamp = Date.now()
      return d
    })
    let item = await this._createPerformanceData(WxPerformanceDataType.WX_PERFORMANCE, _data)
    this._pushData([item])
  }

  // 现在只统计第一次的
  async handleWxAction(data: WxPerformanceItem) {
    if (!this.__firstAction) {
      let d = await this._createPerformanceData(WxPerformanceDataType.WX_USER_ACTION, [data])
      this._pushData([d])
      this.__firstAction = true
    }
  }

  setLaunchTime(now: number) {
    this.wxLaunchTime = now
  }

  filterUrl(url: string) {
    if (this.ignoreUrl && this.ignoreUrl.test(url)) return true
    return false
  }
}

export default Store
