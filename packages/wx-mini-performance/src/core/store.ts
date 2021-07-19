import { noop, getPageUrl, getDeviceId } from '../utils'
import { generateUUID, validateOption, toStringValidateOption } from '@mitojs/utils'
import { WxPerformanceDataType, WxPerformanceItemType } from '../constant'
import Event from './event'
import {
  WxPerformanceData,
  WxPerformanceAnyObj,
  WxPerformanceInitOptions,
  WxNetworkType,
  WxPerformanceItem,
  WxPerformanceEntryObj
} from '../types/index'

class Store extends Event {
  appId: string
  report: (data: Array<WxPerformanceData>) => void
  immediately?: boolean
  ignoreUrl?: RegExp
  maxBreadcrumbs?: number

  private stack: Array<WxPerformanceData>

  // wx
  getBatteryInfo: () => WechatMiniprogram.GetBatteryInfoSyncResult
  getNetworkType: <T extends WechatMiniprogram.GetNetworkTypeOption = WechatMiniprogram.GetNetworkTypeOption>(
    option?: T
  ) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetNetworkTypeOption>
  systemInfo: WechatMiniprogram.SystemInfo

  // 小程序launch时间
  wxLaunchTime: number

  // 首次点击标志位
  private firstAction: boolean = false

  // 路由跳转start时间记录
  private navigationMap: WxPerformanceAnyObj = {}

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

  buildNavigationStart(entry: WxPerformanceEntryObj) {
    if (entry.entryType === 'navigation') {
      // appLaunch时没有navigationStart
      this.navigationMap[entry.path] = entry.navigationStart || entry.startTime
    }
  }

  async handleWxPerformance(data: Array<WxPerformanceItem> = []) {
    let _data: Array<WxPerformanceItem> = data.map((d) => {
      this.buildNavigationStart(d)
      d.itemType = WxPerformanceItemType.Performance
      d.timestamp = Date.now()
      return d
    })
    let item = await this._createPerformanceData(WxPerformanceDataType.WX_PERFORMANCE, _data)
    this._pushData([item])
  }

  // 只统计首次点击
  async handleWxAction(data: WxPerformanceItem) {
    if (!this.firstAction) {
      let d = await this._createPerformanceData(WxPerformanceDataType.WX_USER_ACTION, [data])
      this._pushData([d])
      this.firstAction = true
    }
  }

  setLaunchTime(now: number) {
    this.wxLaunchTime = now
  }

  filterUrl(url: string) {
    if (this.ignoreUrl && this.ignoreUrl.test(url)) return true
    return false
  }

  customPaint() {
    const now = Date.now()
    const path = getPageUrl(false)
    setTimeout(async () => {
      if (path && this.navigationMap[path]) {
        const navigationStart = this.navigationMap[path]
        const data = await this._createPerformanceData(WxPerformanceDataType.WX_LIFE_STYLE, [
          {
            itemType: WxPerformanceItemType.WxCustomPaint,
            navigationStart: navigationStart,
            timestamp: now,
            duration: now - navigationStart
          }
        ])
        this._pushData([data])
      }
    }, 1000)
  }
}

export default Store
