import { OnPageChangeCallback } from '../types'
import { proxyHistory } from './proxyHandler'

export const onPageChange = (cb: OnPageChangeCallback) => {
  window.addEventListener('hashchange', function (e) {
    console.log('hashchange')
    cb(e)
  })

  window.addEventListener('popstate', function (e) {
    console.log('popstate')
    cb(e)
  })

  proxyHistory(() => {
    cb()
  })
}
