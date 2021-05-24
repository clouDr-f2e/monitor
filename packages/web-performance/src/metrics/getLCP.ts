/*
 * @author allen(https://github.com/Chryseis)
 * Why not First Meaningful Paint (FMP)
 * In the past we've recommended performance metrics like First Meaningful Paint (FMP) and Speed Index (SI) (both available
 * in Lighthouse) to help capture more of the loading experience after the initial paint,
 * but these metrics are complex, hard to explain,
 * and often wrong—meaning they still do not identify when the main content of the page has loaded.
 * (https://web.dev/lcp/)
 *
 * The Largest Contentful Paint (LCP) metric reports the render time of the largest image or text block visible within the viewport,
 * relative to when the page first started loading.
 * */
import { isPerformanceObserverSupported } from '../utils/isSupported'
import getFirstHiddenTime from '../lib/getFirstHiddenTime'
import { metricsName } from '../constants'
import { IMetrics, IReportHandler } from '../types'
import metricsStore from '../lib/store'
import { roundByFour } from '../utils'
import observe from '../lib/observe'

const getLCP = (lcp: PerformanceEntry): PerformanceObserver | undefined => {
  if (!isPerformanceObserverSupported()) {
    console.error('browser do not support performanceObserver')
    return
  }

  const firstHiddenTime = getFirstHiddenTime()

  const entryHandler = (entry: PerformanceEntry) => {
    if (entry.startTime < firstHiddenTime.timeStamp) {
      lcp = entry
    }
  }

  return observe('largest-contentful-paint', entryHandler)
}

/*
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initLCP = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  let lcp = {} as PerformanceEntry
  const po = getLCP(lcp)

  const stopListening = () => {
    po.disconnect()

    const metrics = { name: metricsName.LCP, value: roundByFour(lcp.startTime, 2) }

    if (immediately) {
      report(metrics)
    }

    store.set(metricsName.LCP, metrics)
  }

  ;['click', 'keydown'].forEach((event) => {
    addEventListener(event, stopListening, { once: true, capture: true })
  })
}
