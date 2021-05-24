/*
 * @author allen(https://github.com/Chryseis)
 * First Contentful Paint (FCP) is when the browser renders the first bit of content from the DOM,
 * providing the first feedback to the user that the page is actually loading(https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint)
 * */
import { isPerformanceObserverSupported } from '../utils/isSupported'
import { IMetrics, IReportHandler } from '../types'
import { roundByFour } from '../utils'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'
import observe from '../lib/observe'

const getFCP = (): Promise<PerformanceEntry> | undefined => {
  if (!isPerformanceObserverSupported()) {
    console.error('browser do not support performanceObserver')
    return
  }

  return new Promise((resolve) => {
    const entryHandler = (entry: PerformanceEntry) => {
      if (entry.name === 'first-contentful-paint') {
        if (po) {
          po.disconnect()
        }

        resolve(entry)
      }
    }

    const po = observe('paint', entryHandler)
  })
}

/*
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initFCP = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  getFCP()?.then((entry: PerformanceEntry) => {
    const metrics = { name: metricsName.FCP, value: roundByFour(entry.startTime, 2) } as IMetrics

    if (immediately) {
      report(metrics)
    }

    store.set(metricsName.FCP, metrics)
  })
}
