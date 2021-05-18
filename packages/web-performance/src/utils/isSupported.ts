export const isPerformanceSupported = (): boolean => {
  return !!performance && !!performance.getEntriesByType && !!performance.mark
}

export const isPerformanceObserverSupported = (): boolean => {
  return !!PerformanceObserver
}

export const isNavigatorSupported = (): boolean => {
  return !!navigator
}
