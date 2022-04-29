/**
 * @author allen(https://github.com/Chryseis)
 * First Paint,is the time between navigation and when the browser renders the first pixels to the screen,
 * rendering anything that is visually different from what was on the screen prior to navigation.(https://developer.mozilla.org/en-US/docs/Glossary/First_paint)
 * */
import { isPerformanceObserverSupported, isPerformanceSupported } from '../utils/isSupported'
import { IMetrics, IReportHandler } from '../types'
import { roundByDigits } from '../utils'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'
import observe from '../lib/observe'
import getFirstHiddenTime from '../lib/getFirstHiddenTime'
import calcScore from '../lib/calculateScore'

const getFP = (): Promise<PerformanceEntry> | undefined => {
  return new Promise((resolve, reject) => {
    if (!isPerformanceObserverSupported()) {
      if (!isPerformanceSupported()) {
        reject(new Error('browser do not support performance'))
      } else {
        const [entry] = performance.getEntriesByName('first-paint')

        if (entry) {
          resolve(entry)
        }

        reject(new Error('browser has no fp'))
      }
    } else {
      const entryHandler = (entry: PerformanceEntry) => {
        if (entry.name === 'first-paint') {
          if (po) {
            po.disconnect()
          }

          if (entry.startTime < getFirstHiddenTime().timeStamp) {
            resolve(entry)
          }
        }
      }

      const po = observe('paint', entryHandler)
    }
  })
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * @param scoreConfig
 * */
export const initFP = (store: metricsStore, report: IReportHandler, immediately = true, scoreConfig): void => {
  getFP()
    ?.then((entry: PerformanceEntry) => {
      const metrics = {
        name: metricsName.FP,
        value: roundByDigits(entry.startTime, 2),
        score: calcScore(metricsName.FP, entry.startTime, scoreConfig)
      } as IMetrics

      store.set(metricsName.FP, metrics)

      if (immediately) {
        report(metrics)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
