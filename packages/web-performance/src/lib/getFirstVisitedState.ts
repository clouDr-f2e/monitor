import { onPageChange } from './onPageChange'

let firstVisitedState = true

onPageChange(() => {
  firstVisitedState = false
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
