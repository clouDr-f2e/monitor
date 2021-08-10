export const isPerformanceSupported = (): boolean => {
  return !!window.performance && !!window.performance.getEntriesByType && !!window.performance.mark
}

export const isPerformanceObserverSupported = (): boolean => {
  return !!window.PerformanceObserver
}

export const isNavigatorSupported = (): boolean => {
  return !!window.navigator
}
