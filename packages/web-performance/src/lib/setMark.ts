import { isPerformanceSupported } from '../utils/isSupported'

const setMark = (markName: string): void | undefined => {
  if (!isPerformanceSupported()) {
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

export { setMark, clearMark }
