export interface IConfig {
  projectName: string
  version?: string
  reportCallback: Function
  immediatelyReport: boolean
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
}

export interface IReportHandler {
  (metrics: IMetrics | Array<IMetrics>): void
}

export interface IConnection {
  downlink: number
  effectiveType: string
  rtt: number
}
