import { isPerformanceSupported } from '../utils/isSupported'

const setMark = (markName: string): void | undefined => {
  if (!isPerformanceSupported()) {
    return
  }

  performance.mark(markName)
}

export default setMark
