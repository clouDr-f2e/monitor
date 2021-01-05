/**
 * 获取wx当前route的方法
 */
export function getCurrentRoute() {
  return getCurrentPages().pop().route
}
