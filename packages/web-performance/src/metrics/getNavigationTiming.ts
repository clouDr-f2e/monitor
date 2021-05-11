/*
 * Page loads waterfall stream
 * dns lookup = domainLookupEnd - domainLookupStart
 * initial connection = connectEnd - connectStart
 * ssl = connectEnd - secureConnectionStart
 * ttfb = responseStart - requestStart
 * content download = responseEnd - responseStart
 * dom parse = domInteractive - responseEnd
 * resource download = loadEventStart - domContentLoadedEventEnd
 * */
import { PerformanceNavigationTiming } from '../types'

const getNavigationTiming = (): PerformanceNavigationTiming => {
  return {}
}
