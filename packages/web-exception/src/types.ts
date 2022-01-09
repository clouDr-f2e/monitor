import { ActionTracker } from './tracker';

export interface ExceptionOptions {
  dns: string,
  disabled?: boolean,
  apikey: string,
  debug?: boolean,
  enableTraceId?: boolean
  maxBreadcrumbs?: number
  maxDuplicateCount?: number
  report?: (source: ReportData) => unknown,
}

export interface WebExceptionOptions extends ExceptionOptions {
  silent?: WebSilentOptions
}

export interface ErrorCatchOptions<T> {
  log: (source: Partial<ReportDataContent>) => unknown
  actionTracker: T
}

export interface ActionTrackerOptions {
  maxBreadcrumbs?: number
}

export interface WebSilentOptions {
  xhr?: boolean
  fetch?: boolean
  resource?: boolean
  console?: boolean
  dom?: boolean
  history?: boolean
  error?: boolean
  unhandledRejection?: boolean
}

export interface Error {
  errorId: string
  eventId: string
}

export enum BREADCRUMB_TYPES {
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

  // wx BaseEvent
  TAP = 'UI.Tap',
  TOUCHMOVE = 'UI.Touchmove'
}

export enum BREADCRUMB_CATEGORY {
  HTTP = 'http',
  USER = 'user',
  DEBUG = 'debug',
  EXCEPTION = 'exception',
  LIFECYCLE = 'lifecycle'
}

export interface BreadcrumbData {
  type: BREADCRUMB_TYPES | string
  data: any
  category: BREADCRUMB_CATEGORY | string
  time: number
}

export type ErrorStack = {
  args: string[]
  column: string
  func: string
  line: number
  url: string
}[]


export interface AuthInfo {
  apikey?: string
  trackKey?: string
  sdkVersion: string
  sdkName: string
  trackerId: string
}

export interface ReportData {
  authInfo: AuthInfo,
  breadcrumb?: BreadcrumbData[],
  data: ReportDataContent,
  deviceInfo: DeviceInfo
}


export interface DeviceInfo {
  //网络类型: 4g,3g,5g,wifi
  netType: string
  clientWidth: number
  clientHeight: number
  // 像素密度倍率(计算屏幕实际宽高 可使用此参数： 例 height = clientHeight * radio)
  ratio: number
}


export interface ReportDataContent {
  type?: string
  message?: string
  url: string
  name?: string
  stack?: any
  time?: number
  errorId?: number
  level?: string
  // ajax
  elapsedTime?: number
  request?: {
    httpType?: string
    traceId?: string
    method: string
    url: string
    data: any
  }
  response?: {
    status: number
    data: string
  }
  // vue
  componentName?: string
  propsData?: any
  // logError 手动报错 MITO.log
  customContent?: string
  [prop: string]: any
}

/**
 * 上报错误类型
 */
export enum ERROR_TYPES {
  UNKNOWN = 'UNKNOWN',
  UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  LOG_ERROR = 'LOG_ERROR',
  FETCH_ERROR = 'HTTP_ERROR',
  VUE_ERROR = 'VUE_ERROR',
  REACT_ERROR = 'REACT_ERROR',
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  PROMISE_ERROR = 'PROMISE_ERROR',
  ROUTE_ERROR = 'ROUTE_ERROR',
  CUSTOM_ERROR = 'CUSTOM_ERROR'
}
