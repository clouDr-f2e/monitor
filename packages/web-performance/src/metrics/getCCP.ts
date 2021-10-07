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

const remoteQueue = []
const completeQueue = []
let isDone = false

const reportMetrics = (name, report, store) => {
  const metrics = { name, value: performance.now() }
  store.set('api-complete', metrics)
  report(metrics)
}

const beforeHandler = (url, apiConfig, hashHistory) => {
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
}

const afterHandler = (url, report, store) => {
  const firstVisitedState = getFirstVisitedState()
  if (!firstVisitedState) {
    completeQueue.push(url)

    if (isEqualArr(remoteQueue, completeQueue)) {
      reportMetrics('api-complete-time', report, store)

      setTimeout(() => {
        const images = Array.from(document.querySelectorAll('img')).filter((image) => !image.complete && image.src)
        if (images.length > 0) {
          let loadImages
          images.forEach((image) => {
            image.addEventListener('load', () => {
              loadImages += 1
              if (loadImages === images.length) {
                reportMetrics('custom-contentful-paint', report, store)
              }
            })
            image.addEventListener('error', () => {
              loadImages += 1
              if (loadImages === images.length) {
                reportMetrics('custom-contentful-paint', report, store)
              }
            })
          })
        } else {
          reportMetrics('custom-contentful-paint', report, store)
        }
      })
    }
  }
}

export const initCCP = (
  store: metricsStore,
  report: IReportHandler,
  customCompleteEvent: string,
  apiConfig: { [prop: string]: Array<string> },
  hashHistory
) => {
  addEventListener(
    customCompleteEvent,
    () => {
      isDone = true
    },
    { once: true, capture: true }
  )

  proxyXhr(
    (url) => beforeHandler(url, apiConfig, hashHistory),
    (url) => afterHandler(url, report, store)
  )
  proxyFetch(
    (url) => beforeHandler(url, apiConfig, hashHistory),
    (url) => afterHandler(url, report, store)
  )
}
