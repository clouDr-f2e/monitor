export interface IConfig {
  projectName: string
  version?: string
}

export interface IPerformanceNavigationTiming {
  dnsLookup?: number
  initialConnection?: number
  ssl?: number
  ttfb?: number
  contentDownload?: number
  domParse?: number
  resourceDownload?: number
}

export interface IMetrics {
  name: string
  value: any
}

export interface IWebVitals {}
