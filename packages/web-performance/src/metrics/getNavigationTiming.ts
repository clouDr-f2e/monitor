/*
 * @author allen(https://github.com/Chryseis)
 * Page loads waterfall stream
 * dns lookup = domainLookupEnd - domainLookupStart
 * initial connection = connectEnd - connectStart
 * ssl = connectEnd - secureConnectionStart
 * ttfb = responseStart - requestStart
 * content download = responseEnd - responseStart
 * dom parse = domInteractive - responseEnd
 * resource download = loadEventStart - domContentLoadedEventEnd
 * */
import { IMetrics, IPerformanceNavigationTiming, IReportHandler } from '../types'
import { isPerformanceSupported } from '../utils/isSupported'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'

const getNavigationTiming = (): IPerformanceNavigationTiming => {
  if (!isPerformanceSupported) {
    console.log('browser do not support performance')
    return
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

  const {
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
    secureConnectionStart,
    requestStart,
    responseStart,
    responseEnd,
    domInteractive,
    domContentLoadedEventEnd,
    loadEventStart
  } = navigation

  return {
    dnsLookup: domainLookupEnd - domainLookupStart,
    initialConnection: connectEnd - connectStart,
    ssl: connectEnd - secureConnectionStart,
    ttfb: responseStart - requestStart,
    contentDownload: responseEnd - responseStart,
    domParse: domInteractive - responseEnd,
    resourceDownload: loadEventStart - domContentLoadedEventEnd
  }
}

/*
 * @param {Function} bindReport
 * @param {Boolean} immediately, if immediately is true,data will report immediately
 * */
export const initNavigationTiming = (report: IReportHandler, immediately: Boolean = true): void => {
  const navigationTiming = getNavigationTiming()

  const metrics = { name: metricsName.NT, value: navigationTiming } as IMetrics

  if (immediately) {
    report(metrics)
  }

  metricsStore.set(metricsName.NT, metrics)
}
