import WebVitals from '../index'

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

export interface IMetrics {}

export interface IWebVitals {}
