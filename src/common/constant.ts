export type voidFun = () => void
/**
 * 上报错误类型
 */
export enum ERRORTYPES {
  UNKNOWN = 'UNKNOWN',
  UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  LOG_ERROR = 'LOG_ERROR',
  FETCH_ERROR = 'HTTP_ERROR',
  VUE_ERROR = 'VUE_ERROR',
  REACT_ERROR = 'REACT_ERROR',
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  PROMISE_ERROR = 'PROMISE_ERROR',
  MINIPROGRAM_REQUEST_ERROR = 'MINIPROGRAM_REQUEST_ERROR',
  ROUTE_ERROR = 'ROUTE_ERROR'
}

export enum WxAppEvents {
  AppOnLaunch = 'AppOnLaunch',
  AppOnShow = 'AppOnShow',
  AppOnHide = 'AppOnHide',
  AppOnError = 'AppOnError',
  AppOnPageNotFound = 'AppOnPageNotFound',
  AppOnUnhandledRejection = 'AppOnUnhandledRejection'
}

export enum WxPageEvents {
  PageOnShow = 'PageOnShow',
  PageOnHide = 'PageOnHide',
  PageOnShareAppMessage = 'PageOnShareAppMessage',
  PageOnShareTimeline = 'PageOnShareTimeline',
  PageOnTabItemTap = 'PageOnTabItemTap'
}

export enum WxRouteEvents {
  SwitchTab = 'switchTab',
  ReLaunch = 'reLaunch',
  RedirectTo = 'redirectTo',
  NavigateTo = 'navigateTo',
  NavigateBack = 'navigateBack',
  RouteFail = 'routeFail'
}

export type WxEvents = WxAppEvents | WxPageEvents | WxRouteEvents

export const CompositeEvents = {
  ...WxAppEvents,
  ...WxPageEvents,
  ...ERRORTYPES
}

export type CompositeEvents = typeof CompositeEvents

/**
 * 用户行为栈事件类型
 */
export enum BREADCRUMBTYPES {
  ROUTE = 'Route',
  CLICK = 'UI.Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  VUE = 'Vue',
  REACT = 'React',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error',

  CUSTOMER = 'Customer',
  // wx life cycle
  APP_ON_SHOW = 'App On Show',
  APP_ON_LAUNCH = 'App On Launch',
  APP_ON_HIDE = 'App On Hide',
  PAGE_ON_SHOW = 'Page On Show',
  PAGE_ON_HIDE = 'Page On Hide',
  PAGE_ON_SHARE_APP_MESSAGE = 'Page On Share App Message',
  PAGE_ON_SHARE_TIMELINE = 'Page On Share Timeline',
  PAGE_ON_TAB_ITEM_TAP = 'Page On Tab Item Tap',

  // wx BaseEvent
  TAP = 'UI.Tap',
  TOUCHMOVE = 'UI.Touchmove',

  // wx network
  MINIPROGRAM_REQUEST = 'Miniprogram Request'
}

/**
 * 用户行为整合类型
 */
export enum BREADCRUMBCATEGORYS {
  HTTP = 'http',
  USER = 'user',
  DEBUG = 'debug',
  EXCEPTION = 'exception',
  LIFECYCLE = 'lifecycle',
  NETWORK = 'network'
}
/**
 * 重写的事件类型
 */
export enum EVENTTYPES {
  XHR = 'xhr',
  FETCH = 'fetch',
  CONSOLE = 'console',
  DOM = 'dom',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  UNHANDLEDREJECTION = 'unhandledrejection',
  MITO = 'mito',
  VUE = 'Vue',
  // for miniprogram
  MINI_ROUTE = 'miniRoute'
}

export enum HTTPTYPE {
  XHR = 'xhr',
  FETCH = 'fetch'
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_EXCEPTION = 500
}

export const ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
const globalVar = {
  isLogAddBreadcrumb: true,
  crossOriginThreshold: 1000
}
export { globalVar }
