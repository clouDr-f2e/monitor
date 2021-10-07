import { proxyHistory } from './proxyHandler'

let firstVisitedState = false

/**
 * get state which page is visited
 */
const getFirstVisitedState = () => {
  window.addEventListener('hashchange', function () {
    firstVisitedState = true
  })

  window.addEventListener('popstate', function () {
    firstVisitedState = true
  })

  proxyHistory(() => {
    firstVisitedState = true
  })

  return {
    get state() {
      return firstVisitedState
    }
  }
}

export default getFirstVisitedState
