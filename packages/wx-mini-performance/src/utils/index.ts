import { setUrlQuery, variableTypeDetection } from '@mitojs/utils'
import { STORAGE_KEY } from '../constant'

export function noop() {}

// wx

export function generateUUID(): string {
  let uuid: string = wx.getStorageSync(STORAGE_KEY.uuid)
  if (!uuid) {
    let d = new Date().getTime()
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    wx.setStorageSync(STORAGE_KEY.uuid, uuid)
  }
  return uuid
}

export function getPageUrl() {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
  if (!pages.length) {
    return 'App'
  }
  const page = pages[pages.length - 1]
  return setUrlQuery(page.route, page.options)
}

export function getNavigateBackTargetUrl(delta: number | undefined) {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
  if (!pages.length) {
    return 'App'
  }
  delta = delta || 1
  const toPage = pages[pages.length - delta]
  return setUrlQuery(toPage.route, toPage.options)
}
