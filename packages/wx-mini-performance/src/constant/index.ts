export enum EListenerTypes {
  Touchmove = 'touchmove',
  Tap = 'tap',
  LongTap = 'longtap',
  LongPress = 'longpress'
}

export const STORAGE_KEY = {
  deviceId: 'mito--uuid'
}

export enum WxPerformanceDataType {
  MEMORY_WARNING = 'MEMORY_WARNING',
  WX_PERFORMANCE = 'WX_PERFORMANCE',
  WX_NETWORK = 'WX_NETWORK',
  WX_WATER_FALL = 'WX_WATER_FALL',
  WX_LIFE_STYLE = 'WX_LIFE_STYLE',
  WX_USER_ACTION = 'WX_USER_ACTION'
}

export enum WxPerformanceItemType {
  MemoryWarning = 'WxMemory',
  Performance = 'WxPerformance',
  Network = 'WxNetwork',
  AppOnLaunch = 'AppOnLaunch',
  AppOnShow = 'AppOnShow',
  AppOnHide = 'AppOnHide',
  AppOnError = 'AppOnError',
  AppOnPageNotFound = 'AppOnPageNotFound',
  AppOnUnhandledRejection = 'AppOnUnhandledRejection',
  PageOnLoad = 'PageOnLoad',
  PageOnShow = 'PageOnShow',
  PageOnHide = 'PageOnHide',
  PageOnReady = 'PageOnReady',
  PageOnUnload = 'PageOnUnload',
  PageOnShareAppMessage = 'PageOnShareAppMessage',
  PageOnShareTimeline = 'PageOnShareTimeline',
  PageOnTabItemTap = 'PageOnTabItemTap',
  WaterFallFinish = 'WaterFallFinish',
  UserTap = 'WxUserTap',
  UserTouchMove = 'WxUserTouchMove',
  WxRequest = 'WxRequest',
  WxUploadFile = 'WxUploadFile',
  WxDownloadFile = 'WxDownloadFile'
}

export const WxListenerTypes = {
  [EListenerTypes.Tap]: WxPerformanceItemType.UserTap,
  [EListenerTypes.Touchmove]: WxPerformanceItemType.UserTouchMove
}
