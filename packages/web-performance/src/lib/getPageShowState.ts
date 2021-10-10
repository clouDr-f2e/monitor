let pageShowState = false

const getPageShowState = () => {
  addEventListener('pageshow', () => {
    pageShowState = true
  })

  return {
    get state() {
      return pageShowState
    }
  }
}

export default getPageShowState
