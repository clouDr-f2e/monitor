import { OnPageChangeCallback } from '../types'
import { proxyHistory } from './proxyHandler'

export const onPageChange = (cb: OnPageChangeCallback) => {
  window.addEventListener('hashchange', function (e) {
    cb(e)
  })

  window.addEventListener('popstate', function (e) {
    cb(e)
  })

  proxyHistory(() => {
    cb()
  })
}
