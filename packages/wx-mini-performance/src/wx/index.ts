import Store from '../core/store'
import { WxPerformancePushType } from '../constant'

// 内存警告

export function initMemoryWarning(store: Store, need: boolean) {
  if (!need) return
  wx.onMemoryWarning((res: WechatMiniprogram.OnMemoryWarningCallbackResult) => {
    store.push(WxPerformancePushType.MEMORY_WARNING, res)
  })
}

// 网络状态

export function noNetworkType<T extends WechatMiniprogram.GetNetworkTypeOption = WechatMiniprogram.GetNetworkTypeOption>(
  option?: T
): WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetNetworkTypeOption> {
  return
  Promise.resolve({
    networkType: 'unknown',
    signalStrength: 0
  })
}

export function initNetworkInfo(store: Store, need: boolean): void {
  store.getNetworkType = need ? wx.getNetworkType : noNetworkType
}

// 电量

function noBatteryInfo(): WechatMiniprogram.GetBatteryInfoSyncResult {
  return {
    level: '0',
    isCharging: false
  }
}

export function initBatteryInfo(store: Store, need: boolean): void {
  store.getBatteryInfo = need ? wx.getBatteryInfoSync : noBatteryInfo
}

// 微信性能

export function initWxPerformance(store: Store) {
  const performance = wx.getPerformance()
  const observer = performance.createObserver((entryList) => {
    store.push(WxPerformancePushType.WX_PERFORMANCE, entryList.getEntries())
  })
  observer.observe({ entryTypes: ['navigation', 'render', 'script'] })
}

// appHide 发送

export function initWxHideReport(store: Store, immediately: boolean, onAppHideReport: boolean) {
  if (immediately || !onAppHideReport) return
  wx.onAppHide(() => {
    store.reportLeftData()
  })
}
