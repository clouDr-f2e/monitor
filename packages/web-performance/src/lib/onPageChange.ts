import { OnPageChangeCallback } from '../types'
import { proxyHistory } from './proxyHandler'
import getPageShowState from './getPageShowState'

export const onPageChange = (cb: OnPageChangeCallback) => {
  window.addEventListener('hashchange', function (e) {
    cb(e)
  })

  window.addEventListener('popstate', function (e) {
    cb(e)
  })

  proxyHistory(() => {
    const state = getPageShowState().state

    if (state) {
      cb()
    }
  })
}
