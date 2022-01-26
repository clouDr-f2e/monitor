export interface IConfig {
  appId?: string
  version?: string
  reportCallback: Function
  immediately: boolean
  isCustomEvent?: boolean
  logFpsCount?: number
  apiConfig?: {
    [prop: string]: Array<string>
  }
  hashHistory?: boolean
  excludeRemotePath?: Array<string>
  maxWaitCCPDuration: number
  scoreConfig?: IScoreConfig
}

export interface IPerformanceNavigationTiming {
  dnsLookup?: number
  initialConnection?: number
  ssl?: number
  ttfb?: number
  contentDownload?: number
  domParse?: number
  deferExecuteDuration?: number
  domContentLoadedCallback?: number
  resourceLoad?: number
  domReady?: number
  pageLoad?: number
}

export interface IDeviceInformation {
  deviceMemory?: number
  hardwareConcurrency?: number
  jsHeapSizeLimit?: number
  totalJSHeapSize?: number
  usedJSHeapSize?: number
}

export interface INetworkInformation {
  downlink?: number
  effectiveType?: IEffectiveType
  rtt?: number
}

export interface IScoreConfig {
  [prop: string]: { median: number; p10: number }
}

export interface IEffectiveType {
  type: '4g' | '3g' | '2g' | 'slow-2g'
}

export interface IPageInformation {
  host: string
  hostname: string
  href: string
  protocol: string
  origin: string
  port: string
  pathname: string
  search: string
  hash: string
  userAgent?: string
  screenResolution: string
}

export interface IMetrics {
  name: string
  value: any
  score?: number
}

export interface IWebVitals {
  immediately: boolean
  getCurrentMetrics(): IMetricsObj
  setStartMark(markName: string): void
  setEndMark(markName: string): void
  clearMark(markName: string): void
  customContentfulPaint(customMetricName: string): void
}

export interface IReportHandler {
  (metrics: IMetrics | IMetricsObj): void
}

export interface PerformanceEntryHandler {
  (entry: PerformanceEntry): void
}

export interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp
  processingEnd: DOMHighResTimeStamp
  duration: DOMHighResTimeStamp
  cancelable?: boolean
  target?: Element
}

export interface OnHiddenCallback {
  (event: Event): void
}

export interface OnPageChangeCallback {
  (event?: Event): void
}

export interface IReportData {
  sessionId: string
  appId?: string
  version?: string
  data: IMetrics | IMetricsObj
  timestamp: number
}

export interface IMetricsObj {
  [prop: string]: IMetrics
}

export interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

export interface Curve {
  median: number
  podr?: number
  p10?: number
}

declare global {
  interface Window {
    // Build flags:
    __monitor_xhr__: boolean
    __monitor_fetch__: boolean
    __monitor_sessionId__: string
  }
}
