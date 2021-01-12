import { variableTypeDetection } from '@/utils'

/**
 * 获取wx当前route的方法
 * 必须是在进入Page或Component构造函数内部才能够获取到currentPages
 * 否则都是在注册Page和Component时执行的代码，此时url默认返回'App'
 */
export function getCurrentRoute() {
  if (variableTypeDetection.isFunction(getCurrentPages)) {
    const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
    return pages.length ? getCurrentPages().pop().route : 'App'
  }
}
