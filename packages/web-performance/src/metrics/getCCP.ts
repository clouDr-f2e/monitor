/**
 * @author allen(https://github.com/Chryseis)
 * CCP
 * The Custom Contentful Paint (CCP) metric reports the render time of page remote api end,
 * relative to when the page first started loading.
 * */
import { proxyFetch, proxyXhr } from '../lib/proxyHandler'
import getFirstVisitedState from '../lib/getFirstVisitedState'
import metricsStore from '../lib/store'
import { IReportHandler } from '../types'
import { isEqualArr } from '../utils'
import getPath from '../utils/getPath'
import { isPerformanceSupported } from '../utils/isSupported'
import { metricsName } from '../constants'
import { onHidden } from '../lib/onHidden'
import { onPageChange } from '../lib/onPageChange'

const remoteQueue = []
const completeQueue = []
let isDone = false

const storeMetrics = (name, value, store) => {
  const metrics = { name, value }
  store.set(name, metrics)
}

const beforeHandler = (url, apiConfig, hashHistory) => {
  if (isPerformanceSupported()) {
    const path = getPath(location, hashHistory)
    const firstVisitedState = getFirstVisitedState()
    if (!firstVisitedState) {
      if (apiConfig[path]) {
        if (apiConfig[path].some((path) => path.indexOf(url) > -1)) {
          remoteQueue.push(url)
        }
      } else {
        if (!isDone) {
          remoteQueue.push(url)
        }
      }
    }
  } else {
    console.warn('browser do not support performance')
  }
}

const afterHandler = (url, store) => {
  if (isPerformanceSupported()) {
    const firstVisitedState = getFirstVisitedState()
    if (!firstVisitedState) {
      completeQueue.push(url)

      if (isEqualArr(remoteQueue, completeQueue)) {
        storeMetrics(metricsName.ACT, performance.now(), store)

        setTimeout(() => {
          const images = Array.from(document.querySelectorAll('img')).filter((image) => !image.complete && image.src)
          if (images.length > 0) {
            let loadImages
            images.forEach((image) => {
              image.addEventListener('load', () => {
                loadImages += 1
                if (loadImages === images.length) {
                  storeMetrics(metricsName.CCP, performance.now(), store)
                  storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store)
                }
              })
              image.addEventListener('error', () => {
                loadImages += 1
                if (loadImages === images.length) {
                  storeMetrics(metricsName.CCP, performance.now(), store)
                  storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store)
                }
              })
            })
          } else {
            storeMetrics(metricsName.CCP, performance.now(), store)
            storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store)
          }
        })
      }
    }
  } else {
    console.warn('browser do not support performance')
  }
}

const reportMetrics = (store: metricsStore, report) => {
  const ccp = store.get(metricsName.CCP)
  const rl = store.get(metricsName.RL)
  const act = store.get(metricsName.ACT)

  if (act) {
    report(act)
  }

  if (ccp) {
    report(ccp)
  }

  if (rl) {
    report(rl)
  }
}

export const initCCP = (
  store: metricsStore,
  report: IReportHandler,
  customCompleteEvent: string,
  apiConfig: { [prop: string]: Array<string> },
  hashHistory
) => {
  const event = customCompleteEvent || 'pageshow'
  window.addEventListener(
    event,
    () => {
      isDone = true
      if (isPerformanceSupported()) {
        storeMetrics(metricsName.CCP, performance.now(), store)
        storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store)
      }
    },
    { once: true, capture: true }
  )

  onHidden(() => reportMetrics(store, report))

  onPageChange(() => reportMetrics(store, report))

  proxyXhr(
    (url) => beforeHandler(url, apiConfig, hashHistory),
    (url) => afterHandler(url, store)
  )
  proxyFetch(
    (url) => beforeHandler(url, apiConfig, hashHistory),
    (url) => afterHandler(url, store)
  )
}
