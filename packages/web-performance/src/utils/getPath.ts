/**
 * @param location {Location}
 * @param isHash {boolean}
 * @return {string} the page path
 */
const getPath = (location: Location, isHash: boolean) => {
  if (isHash) {
    return location.pathname.replace(/\/$/, '')
  } else {
    const index = location.href.indexOf('#')
    if (index < 0) return ''
    return location.href.slice(index + 1)
  }
}

export default getPath
