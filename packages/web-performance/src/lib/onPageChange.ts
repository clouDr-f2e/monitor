import { OnPageChangeCallback } from '../types'
import { proxyHistory } from './proxyHandler'

let pageShowState = false

addEventListener('pageshow', () => {
  pageShowState = true
})

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

  proxyHistory(() => {
    if (pageShowState) {
      cb()
    }
  })
}
