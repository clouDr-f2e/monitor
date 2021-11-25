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
import { getApiPath, isIncludeArr } from '../utils'
import getPath from '../utils/getPath'
import { isPerformanceSupported } from '../utils/isSupported'
import { metricsName } from '../constants'
import { onHidden } from '../lib/onHidden'
import { onPageChange } from '../lib/onPageChange'

const remoteQueue = {
  hasStoreMetrics: false,
  queue: []
}
const completeQueue = []
let isDone = false
let reportLock = true

const storeMetrics = (name, value, store) => {
  const metrics = { name, value }
  store.set(name, metrics)
}

const computeCCPAndRL = (store) => {
  setTimeout(() => {
    const images = Array.from(document.querySelectorAll('img')).filter((image) => {
      return !image.complete && image.src
    })
    if (images.length > 0) {
      let loadImages = 0
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

const beforeHandler = (url, apiConfig, needCCP, hashHistory) => {
  if (isPerformanceSupported()) {
    const path = getPath(location, hashHistory)
    const firstVisitedState = getFirstVisitedState().state
    if (!firstVisitedState) {
      const remotePath = getApiPath(url)
      if (apiConfig && apiConfig[path]) {
        if (apiConfig[path].some((o) => remotePath === o)) {
          remoteQueue.queue.push(remotePath)
        }
      } else {
        if (!isDone && needCCP) {
          remoteQueue.queue.push(remotePath)
        }
      }
    }
  } else {
    console.warn('browser do not support performance')
  }
}

const afterHandler = (url, apiConfig, store, needCCP, hashHistory) => {
  if (isPerformanceSupported()) {
    const path = getPath(location, hashHistory)
    const firstVisitedState = getFirstVisitedState().state
    if (!firstVisitedState) {
      const remotePath = getApiPath(url)
      completeQueue.push(remotePath)
      if (apiConfig && apiConfig[path]) {
        if (isIncludeArr(remoteQueue.queue, completeQueue) && !remoteQueue.hasStoreMetrics) {
          console.log('api list = ', remoteQueue.queue)
          remoteQueue.hasStoreMetrics = true
          storeMetrics(metricsName.ACT, performance.now(), store)
          computeCCPAndRL(store)
        }
      } else {
        if (isIncludeArr(remoteQueue.queue, completeQueue) && !remoteQueue.hasStoreMetrics && isDone && needCCP) {
          console.log('api list = ', remoteQueue.queue)
          remoteQueue.hasStoreMetrics = true
          storeMetrics(metricsName.ACT, performance.now(), store)
          computeCCPAndRL(store)
        }
      }
    }
  } else {
    console.warn('browser do not support performance')
  }
}

const reportMetrics = (store: metricsStore, report, immediately) => {
  if (immediately) {
    if (reportLock) {
      const act = store.get(metricsName.ACT)
      const ccp = store.get(metricsName.CCP)
      const rl = store.get(metricsName.RL)

      if (act && ccp) {
        if (act.value < ccp.value) {
          report(act)
          report(ccp)

          if (rl) {
            report(rl)
          }
        }
      }

      if (!act && ccp) {
        report(ccp)

        if (rl) {
          report(rl)
        }
      }

      reportLock = false
    }
  }
}

const maxWaitTime4Report = (cb: () => void) => {
  setTimeout(cb, 30 * 1000)
}

export const initCCP = (
  store: metricsStore,
  report: IReportHandler,
  needCCP: boolean,
  apiConfig: { [prop: string]: Array<string> },
  hashHistory: boolean,
  immediately: boolean
) => {
  console.log('ccp')
  const event = needCCP ? 'custom-contentful-paint' : 'pageshow'
  addEventListener(
    event,
    () => {
      const firstVisitedState = getFirstVisitedState().state
      if (!firstVisitedState) {
        isDone = true
        if (isPerformanceSupported()) {
          computeCCPAndRL(store)
        }
      }
    },
    { once: true, capture: true }
  )

  onHidden(() => reportMetrics(store, report, immediately), true)

  onPageChange(() => reportMetrics(store, report, immediately))

  maxWaitTime4Report(() => reportMetrics(store, report, immediately))

  proxyXhr(
    (url) => beforeHandler(url, apiConfig, needCCP, hashHistory),
    (url) => afterHandler(url, apiConfig, store, needCCP, hashHistory)
  )
  proxyFetch(
    (url) => beforeHandler(url, apiConfig, needCCP, hashHistory),
    (url) => afterHandler(url, apiConfig, store, needCCP, hashHistory)
  )
}
