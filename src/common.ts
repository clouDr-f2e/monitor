export type voidFun = () => void
export enum ERRORTYPES {
  UNKNOWN = 'UNKNOWN',
  UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  LOG_ERROR = 'LOG_ERROR',
  FETCH_ERROR = 'HTTP_ERROR',
  VUE_ERROR = 'VUE_ERROR',
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  PROMISE_ERROR = 'PROMISE_ERROR'
}
export enum ERRORLEVELS {
  CRITICAL = 1,
  HIGH = 2,
  NORMAL = 3,
  LOW = 4
}
export enum BREADCRUMBTYPES {
  ROUTE = 'Route',
  CLICK = 'Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  VUE = 'Vue',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error'
}
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
  VUE = 'Vue'
}

export enum HTTPTYPE {
  XHR = 'xhr',
  FETCH = 'fetch'
}

export type ErrorType =
  | 'UNKNOWN'
  | 'UNKNOWN_FUNCTION'
  | 'JAVASCRIPT_ERROR'
  | 'BUSINESS_ERROR'
  | 'LOG_ERROR'
  | 'HTTP_ERROR'
  | 'VUE_ERROR'
  | 'RESOURCE_ERROR'
  | 'PROMISE_ERROR'

export const ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
export interface ReportDataType {
  type?: ERRORTYPES
  message?: string
  url: string
  name?: string
  stack?: any
  time?: number
  errorId?: number
  level: number
  // ajax
  elapsedTime?: number
  request?: {
    httpType?: string
    method: string
    url: string
    data: any
  }
  response?: {
    status: number
    statusText: string
    description: string
  }
  // vue
  componentName?: string
  propsData?: any
  // logerror
  info?: string
}
const globalVar = {
  isLogAddBreadcrumb: true
}
export { globalVar }
