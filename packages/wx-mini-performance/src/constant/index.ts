export enum WXEListenerTypes {
  Touchmove = 'touchmove',
  Tap = 'tap',
  Longtap = 'longtap',
  Longpress = 'longpress'
}

export enum WxPerformanceType {
  MEMORY_WARNING = 'memory_warning',
  NAVIGATION = 'navigation',
  FIRST_RENDER = 'firstRender',
  APP_EVALUATE_SCRIPT = 'evaluateScript'
}

export enum WxPerformancePushType {
  MEMORY_WARNING = 'memory_warning',
  WX_PERFORMANCE = 'wx_performance'
  // NAVIGATION_APP_LAUNCH = 'navigation_appLaunch',
  // PAGE_FIRST_RENDER = 'page_firstRender',
  // APP_EVALUATE_SCRIPT = 'evaluateScript'
}

export const STORAGE_KEY = {
  uuid: 'MITO_MINI_PERFORMANCE'
}
