import Store from '../core/store'
import { WxPerformanceDataType, WxPerformanceItemType } from '../constant'
import { WxPerformanceItem, WxPerformanceAnyObj } from '../types/index'

function pushLife(store: Store, itemType: WxPerformanceItemType) {
  store.push(WxPerformanceDataType.WX_LIFE_STYLE, { itemType, timestamp: Date.now() })
}

function pushAction(store: Store, data: WxPerformanceItem) {
  store.push(WxPerformanceDataType.WX_USER_ACTION, { ...data, timestamp: Date.now() })
}

function pushNetwork(store: Store, data: WxPerformanceItem) {
  store.push(WxPerformanceDataType.WX_NETWORK, { ...data, timestamp: Date.now() })
}

const Events = {
  [WxPerformanceItemType.AppOnLaunch]: function (args: any[]) {
    let _this = this as Store
    const now = Date.now()
    _this.setLaunchTime(now)
    _this.push(WxPerformanceDataType.WX_LIFE_STYLE, { itemType: WxPerformanceItemType.AppOnLaunch, timestamp: now })
  },
  [WxPerformanceItemType.AppOnShow]: function () {
    pushLife(this, WxPerformanceItemType.AppOnShow)
  },
  [WxPerformanceItemType.PageOnLoad]: function () {
    pushLife(this, WxPerformanceItemType.PageOnLoad)
  },
  [WxPerformanceItemType.PageOnReady]: function () {
    pushLife(this, WxPerformanceItemType.PageOnReady)
  },
  [WxPerformanceItemType.PageOnUnload]: function () {
    pushLife(this, WxPerformanceItemType.PageOnUnload)
  },
  [WxPerformanceItemType.UserTap]: function (event: WxPerformanceAnyObj) {
    pushAction(this, { ...event, itemType: WxPerformanceItemType.UserTap })
  },
  [WxPerformanceItemType.UserTouchMove]: function (event: WxPerformanceAnyObj) {
    pushAction(this, { ...event, itemType: WxPerformanceItemType.UserTouchMove })
  },
  [WxPerformanceItemType.WxRequest]: function (data: WxPerformanceItem) {
    pushNetwork(this, data)
  },
  [WxPerformanceItemType.WxDownloadFile]: function (data: WxPerformanceItem) {
    pushNetwork(this, data)
  },
  [WxPerformanceItemType.WxUploadFile]: function (data: WxPerformanceItem) {
    pushNetwork(this, data)
  }
}
export default Events
