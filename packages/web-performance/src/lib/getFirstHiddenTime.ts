let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity

const getFirstHiddenTime = () => {
  document.addEventListener(
    'visibilitychange',
    (e: Event) => {
      firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp)
    },
    { once: true }
  )
  return {
    get timeStamp() {
      return firstHiddenTime
    }
  }
}

export default getFirstHiddenTime
