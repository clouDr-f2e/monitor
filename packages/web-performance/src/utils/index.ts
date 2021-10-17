export const roundByFour = (num: number, digits = 4) => {
  try {
    return parseFloat(num.toFixed(digits))
  } catch (err) {
    return num
  }
}

export const convertToMB = (bytes: number): number | null => {
  if (typeof bytes !== 'number') {
    return null
  }
  return roundByFour(bytes / Math.pow(1024, 2))
}

export const afterLoad = (callback) => {
  if (document.readyState === 'complete') {
    setTimeout(callback)
  } else {
    addEventListener('pageshow', callback)
  }
}

export const beforeUnload = (callback) => {
  window.addEventListener('beforeunload', callback)
}

export const unload = (callback) => {
  window.addEventListener('unload', callback)
}

export const validNumber = (nums: number | Array<number>) => {
  if (Array.isArray(nums)) {
    return nums.every((n) => n >= 0)
  } else {
    return nums >= 0
  }
}

export const isIncludeArr = (arr1: Array<string>, arr2: Array<string>): boolean => {
  if (!arr1 || arr1.length === 0) {
    return false
  }

  if (!arr2 || arr2.length === 0) {
    return false
  }

  if (arr1.length > arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      return false
    }
  }

  return true
}

export const getApiPath = (url: string): string => {
  const reg = /http(?:s|):\/\/[^\/\s]+([^#?]+).*/

  if (url) {
    return url.match(reg)?.[1]
  }
  return ''
}
