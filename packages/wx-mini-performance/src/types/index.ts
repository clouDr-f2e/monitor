interface WxPerformanceInitOptions {
  /**
   * 小程序appId
   */
  appId: string
  /**
   * 上报地址
   */
  report: () => void

  immediately?: boolean
  /**
   * 可忽略URL正则
   */
  ignoreUrl?: RegExp
  /**
   * 最大数据存储，默认20，最大100，超过100还是设置成100
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

type WxPerformanceDataType = 'memory_warning' | 'navigation' | 'render' | 'script'

type WxNetworkType = 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none'

enum WxPerformancePushType {
  MEMORY_WARNING = 'memory_warning',
  WX_PERFORMANCE = 'wx_performance'
}

interface WxPerformanceAnyObj {
  [k: string]: any
}

interface WxPerformanceObj extends WxPerformanceAnyObj {
  type: WxPerformancePushType
  timestamp: number
}
interface WxPerformanceData {
  appId: string
  uuid: string
  deviceId: string
  timestamp: number
  time: string
  networkType: WxNetworkType
  batteryLevel: string
  systemInfo: WechatMiniprogram.SystemInfo
  page: string
  data: null | WxPerformanceObj | Array<WxPerformanceObj>
}

interface WxPerformanceEntryData extends WxPerformanceObj {
  entryType: 'navigation' | 'render' | 'script' // 	指标类型
  name: 'route' | 'appLaunch' | 'firstRender' | 'evaluateScript' // 指标名称
  startTime: number // 指标调用开始时间；appLaunch为点击图标的时间
  duration: number //	耗时
  path?: string //	路径
  navigationStart?: number // 路由真正响应开始时间
  navigationType?: 'appLaunch' | 'navigateTo' | 'switchTab' | 'redirectTo' | 'reLaunch' // 路由详细类型
}

interface MiniRoute {
  from: string
  to: string
  isFail?: boolean
  message?: string
}
