/**
 * @param location {Location}
 * @param isHash {boolean}
 * @return {string} the page path
 */
const getPath = (location: Location, isHash: boolean) => {
  if (!isHash) {
    return location.pathname.replace(/\/$/, '')
  } else {
    const index = location.href.indexOf('#')
    if (index < 0) return ''
    const hash = location.href.slice(index + 1)
    const searchIndex = hash.indexOf('?')
    if (searchIndex < 0) return hash
    return hash.slice(0, searchIndex)
  }
}

export default getPath
