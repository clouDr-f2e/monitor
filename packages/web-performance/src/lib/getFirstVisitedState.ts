import { onPageChange } from './onPageChange'

let firstVisitedState = false

/**
 * get state which page is visited
 */
const getFirstVisitedState = () => {
  onPageChange(() => {
    firstVisitedState = true
  })

  return {
    get state() {
      return firstVisitedState
    }
  }
}

export default getFirstVisitedState
