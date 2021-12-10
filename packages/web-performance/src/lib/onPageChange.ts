import { OnPageChangeCallback } from '../types'
import { proxyHistory } from './proxyHandler'

const unifiedHref = (href) => {
  return decodeURIComponent(href?.replace(`${location?.protocol}//${location?.host}`, ''))
}

const lastHref = unifiedHref(location.href)

/**
 * when page is loaded, listen page change
 */
export const onPageChange = (cb: OnPageChangeCallback) => {
  window.addEventListener('hashchange', function (e) {
    cb(e)
  })

  window.addEventListener('popstate', function (e) {
    cb(e)
  })

  proxyHistory((...args) => {
    const currentHref = unifiedHref(args?.[2])
    if (lastHref !== currentHref) {
      cb()
    }
  })
}
