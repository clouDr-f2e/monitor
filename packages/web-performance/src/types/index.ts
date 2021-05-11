export interface Config {
  projectName: string
  version?: string
}

export interface PerformanceNavigationTiming {
  dnsLookup?: number
  initialConnection?: number
  ssl?: number
  ttfb?: number
  contentDownload?: number
  domParse?: number
  resourceDownload?: number
}
