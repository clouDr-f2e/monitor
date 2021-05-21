let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity

export const getFirstHiddenTime = () => {
  document.addEventListener('visibilitychange', (e: Event) => {
    firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp)
  })
  return {
    get timeStamp() {
      return firstHiddenTime
    }
  }
}
