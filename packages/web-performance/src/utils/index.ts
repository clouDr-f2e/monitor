export const roundByFour = (num: number, digits: number = 4) => {
  return parseFloat(num.toFixed(digits))
}

export const convertToMB = (bytes: number): number | null => {
  if (typeof bytes !== 'number') {
    return null
  }
  return roundByFour(bytes / Math.pow(1024, 2))
}
