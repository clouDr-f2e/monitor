export interface WxPerformanceInitOptions {
  /**
   * 应用标识
   */
  appId: string
  /**
   * 应用版本号
   */
  version?: string
  /**
   * 上报地址
   */
  report: () => void
  /**
   * 是否立即上报
   */
  immediately?: boolean
  /**
   * 可忽略URL正则
   */
  ignoreUrl?: RegExp
  /**
   * 最大数据存储
   */
  maxBreadcrumbs?: number
  /**
   * 是否需要网络状态
   */
  needNetworkStatus?: boolean
  /**
   * 是否携带电池信息
   */
  needBatteryInfo?: boolean
  /**
   * 是否需要内存警告
   */
  needMemoryWarning?: boolean
  /**
   * 当immediately为false起效 是否需要在appHide时发送数据，默认为true
   */
  onAppHideReport?: boolean
}

export type WxNetworkType = 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none'

export enum WxPerformanceDataType {
  MEMORY_WARNING = 'MEMORY_WARNING',
  WX_PERFORMANCE = 'WX_PERFORMANCE',
  WX_NETWORK = 'WX_NETWORK',
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
  WxDownloadFile = 'WxDownloadFile',
  WxCustomPaint = 'WxCustomPaint'
}

export interface WxPerformanceAnyObj {
  [k: string]: any
}

// 内存警告
export interface WxPerformanceMemoryItem {
  /** 内存告警等级，只有 Android 才有，对应系统宏定义
   *
   * 可选值：
   * - 5: TRIM_MEMORY_RUNNING_MODERATE;
   * - 10: TRIM_MEMORY_RUNNING_LOW;
   * - 15: TRIM_MEMORY_RUNNING_CRITICAL; */
  level?: 5 | 10 | 15
}

// performance类型
export interface WxPerformanceEntryObj {
  entryType?: 'navigation' | 'render' | 'script' // 	指标类型
  name?: 'route' | 'appLaunch' | 'firstRender' | 'evaluateScript' // 指标名称
  startTime?: number // 指标调用开始时间；appLaunch为点击图标的时间
  duration?: number //	耗时
  path?: string //	路径
  navigationStart?: number // 路由真正响应开始时间
  navigationType?: 'appLaunch' | 'navigateTo' | 'switchTab' | 'redirectTo' | 'reLaunch' // 路由详细类型
}

// 网络类型
export interface WxPerformanceNetworkItem {
  url?: string
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  header?: WxPerformanceAnyObj
  startTime?: number
  endTime?: number
  duration?: number
  status?: number
  errMsg?: string
  filePath?: string
}

export interface WxPerformanceItem extends WxPerformanceMemoryItem, WxPerformanceNetworkItem, WxPerformanceAnyObj {
  itemType: WxPerformanceItemType
  timestamp?: number
}

export interface WxPerformanceData {
  appId: string
  uuid: string
  deviceId: string
  timestamp: number
  time: string
  networkType: WxNetworkType
  batteryLevel: string
  systemInfo: WechatMiniprogram.SystemInfo
  wxLaunch: number
  page: string
  type: WxPerformanceDataType
  item: null | WxPerformanceItem | Array<WxPerformanceItem>
}

export type Listener = (...args: any[]) => void
