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
import { IPerformanceNavigationTiming } from '../types'
import { isPerformanceSupported } from '../utils/isSupported'

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
