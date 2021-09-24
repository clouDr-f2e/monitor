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
