import { onPageChange } from './onPageChange'

let firstVisitedState = false

onPageChange(() => {
  firstVisitedState = true
})

/**
 * get state which page is visited
 */
const getFirstVisitedState = () => {
  return {
    get state() {
      return firstVisitedState
    }
  }
}

export default getFirstVisitedState
