import { isPerformanceSupported } from '../utils/isSupported'

const hasMark = (markName: string) => {
  return performance.getEntriesByName(markName).length > 0
}

const getMark = (markName: string) => {
  return performance.getEntriesByName(markName).pop()
}

const setMark = (markName: string): void | undefined => {
  if (!isPerformanceSupported()) {
    console.error('browser do not support performance')
    return
  }

  performance.mark(markName)
}

const clearMark = (markName: string): void | undefined => {
  if (!isPerformanceSupported()) {
    return
  }

  performance.clearMarks(markName)
}

export { hasMark, getMark, setMark, clearMark }
