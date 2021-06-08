import { isWxMiniEnv } from '@mitojs/utils'
import { initBatteryInfo, initMemoryWarning, initNetworkInfo, initWxHideReport, initWxPerformance } from './wx/index'
import Store from './core/store'
import { version } from '../package.json'

class WxPerformance {
  appId: string
  version: string = version
  __store: Store

  constructor(options: WxPerformanceInitOptions) {
    if (!isWxMiniEnv) {
      return
    }
    const {
      appId,
      report,
      immediately = true,
      maxBreadcrumbs = 4,
      needNetworkStatus = true,
      needBatteryInfo = true,
      needMemoryWarning = true,
      onAppHideReport = true
    } = options
    this.appId = appId

    const store = new Store({ appId, report, immediately, maxBreadcrumbs })
    this.__store = store

    initBatteryInfo(store, needBatteryInfo)
    initNetworkInfo(store, needNetworkStatus)
    initMemoryWarning(store, needMemoryWarning)
    // 如果 immediately为false 会在appHide的时候发送数据
    initWxHideReport(store, immediately, onAppHideReport)
    initWxPerformance(store)
  }
}

export { WxPerformance }
