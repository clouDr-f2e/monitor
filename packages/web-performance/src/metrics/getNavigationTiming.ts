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
 * dom Ready = domContentLoadedEventEnd - fetchStart
 * */
import { IMetrics, IPerformanceNavigationTiming, IReportHandler } from '../types'
import { isPerformanceSupported } from '../utils/isSupported'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'
import { roundByFour } from '../utils'

const getNavigationTiming = (): IPerformanceNavigationTiming => {
  if (!isPerformanceSupported()) {
    console.error('browser do not support performance')
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
    loadEventStart,
    fetchStart
  } = navigation

  return {
    dnsLookup: roundByFour(domainLookupEnd - domainLookupStart),
    initialConnection: roundByFour(connectEnd - connectStart),
    ssl: roundByFour(connectEnd - secureConnectionStart),
    ttfb: roundByFour(responseStart - requestStart),
    contentDownload: roundByFour(responseEnd - responseStart),
    domParse: roundByFour(domInteractive - responseEnd),
    resourceDownload: roundByFour(loadEventStart - domContentLoadedEventEnd),
    domReady: roundByFour(domContentLoadedEventEnd - fetchStart)
  }
}

/*
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initNavigationTiming = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  const navigationTiming: IPerformanceNavigationTiming = getNavigationTiming()

  const metrics = { name: metricsName.NT, value: navigationTiming } as IMetrics

  if (immediately) {
    report(metrics)
  }

  store.set(metricsName.NT, metrics)
}
