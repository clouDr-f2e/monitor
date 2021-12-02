export interface IConfig {
  appId?: string
  version?: string
  reportCallback: Function
  immediately: boolean
  needCCP?: boolean
  logFpsCount?: number
  apiConfig?: {
    [prop: string]: Array<string>
  }
  hashHistory?: boolean
  excludeRemotePath?: Array<string>
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
  effectiveType?: string
  rtt?: number
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

export interface IConnection {
  downlink: number
  effectiveType: string
  rtt: number
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
  sectionId: string
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

declare global {
  interface Window {
    // Build flags:
    __monitor_xhr__: boolean
    __monitor_fetch__: boolean
  }
}
