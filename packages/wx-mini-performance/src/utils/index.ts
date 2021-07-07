import { setUrlQuery, variableTypeDetection, generateUUID } from '@mitojs/utils'
import { STORAGE_KEY } from '../constant'

export function noop() {}

// wx

export function getDeviceId(): string {
  let deviceId: string = wx.getStorageSync(STORAGE_KEY.deviceId)
  if (!deviceId) {
    const deviceId = generateUUID()
    wx.setStorageSync(STORAGE_KEY.deviceId, deviceId)
  }
  return deviceId
}

export function getPageUrl(setQuery = true) {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
  if (!pages.length) {
    return 'App'
  }
  const page = pages[pages.length - 1]
  return setQuery ? setUrlQuery(page.route, page.options) : page.route
}
