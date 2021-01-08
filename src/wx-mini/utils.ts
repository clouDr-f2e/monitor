/**
 * 获取wx当前route的方法
 */
export function getCurrentRoute() {
  const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
  return pages.length ? getCurrentPages().pop().route : 'App'
}
