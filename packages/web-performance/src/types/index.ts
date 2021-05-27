export interface IConfig {
  appId?: string
  version?: string
  reportCallback: Function
  reportUri?: string
  immediately: boolean
  customCompleteEvent?: string
}

export interface IPerformanceNavigationTiming {
  dnsLookup?: number
  initialConnection?: number
  ssl?: number
  ttfb?: number
  contentDownload?: number
  domParse?: number
  resourceDownload?: number
  domReady?: number
}

export interface IDeviceInformation {
  deviceMemory?: number
  hardwareConcurrency?: number
  jsHeapSizeLimit?: number
  totalJSHeapSize?: number
  usedJSHeapSize?: number
  fps?: number
  userAgent?: string
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
}

export interface IMetrics {
  name: string
  value: any
}

export interface IWebVitals {
  getCurrentMetrics(): Array<IMetrics>
  dispatchCustomEvent(): void
  setStartMark(markName: string): void
  setEndMark(markName: string): void
  clearMark(markName: string): void
  customCompletePaint(customMetricName: string): void
}

export interface IReportHandler {
  (metrics: IMetrics | Array<IMetrics>): void
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
