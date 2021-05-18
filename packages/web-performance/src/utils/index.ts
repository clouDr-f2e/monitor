export const roundByFour = (num: number) => {
  return parseFloat(num.toFixed(4))
}

export const convertToMB = (bytes: number): number | null => {
  if (typeof bytes !== 'number') {
    return null
  }
  return roundByFour(bytes / Math.pow(1024, 2))
}
