import { getAppId, isWxMiniEnv, variableTypeDetection } from '@zyf2e/monitor-utils'
import { ERRORTYPES, EVENTTYPES } from '@zyf2e/monitor-shared'
import { ReportDataType } from '@zyf2e/monitor-types'
import { options } from './options'
const allErrorNumber: unknown = {}
/**
 * generate error unique Id
 * @param data
 */
export function createErrorId(data: ReportDataType, apikey: string): number | null {
  let id: any
  switch (data.type) {
    case ERRORTYPES.FETCH_ERROR:
      id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey
      break
    case ERRORTYPES.JAVASCRIPT_ERROR:
    case ERRORTYPES.VUE_ERROR:
    case ERRORTYPES.REACT_ERROR:
      id = data.type + data.name + data.message + apikey
      break
    case ERRORTYPES.LOG_ERROR:
      id = data.customTag + data.type + data.name + apikey
      break
    case ERRORTYPES.PROMISE_ERROR:
      id = generatePromiseErrorId(data, apikey)
      break
    default:
      id = data.type + data.message + apikey
      break
  }
  id = hashCode(id)
  if (allErrorNumber[id] >= options.maxDuplicateCount) {
    return null
  }
  if (typeof allErrorNumber[id] === 'number') {
    allErrorNumber[id]++
  } else {
    allErrorNumber[id] = 1
  }

  return id
}
/**
 * 如果是UNHANDLEDREJECTION，则按照项目主域名来生成
 * 如果是其他的，按照当前页面来生成
 * @param data
 * @param originUrl
 */
function generatePromiseErrorId(data: ReportDataType, apikey: string) {
  const locationUrl = getRealPath(data.url)
  if (data.name === EVENTTYPES.UNHANDLEDREJECTION) {
    return data.type + objectOrder(data.message) + apikey
  }
  return data.type + data.name + objectOrder(data.message) + locationUrl
}

/**
 * sort object keys
 * ../param reason promise.reject
 */
function objectOrder(reason: any) {
  const sortFn = (obj: any) => {
    return Object.keys(obj)
      .sort()
      .reduce((total, key) => {
        if (variableTypeDetection.isObject(obj[key])) {
          total[key] = sortFn(obj[key])
        } else {
          total[key] = obj[key]
        }
        return total
      }, {})
  }
  try {
    if (/\{.*\}/.test(reason)) {
      let obj = JSON.parse(reason)
      obj = sortFn(obj)
      return JSON.stringify(obj)
    }
  } catch (error) {
    return reason
  }
}

/**
 * http://.../project?id=1#a => http://.../project
 * http://.../id/123=> http://.../id/{param}
 *
 * @param url
 */
export function getRealPath(url: string): string {
  return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1')
}

/**
 *
 * @param url
 */
export function getFlutterRealOrigin(url: string): string {
  // for apple
  return removeHashPath(getFlutterRealPath(url))
}

/**
 * 获取flutter的原始地址：每个用户的文件夹hash不同
 * @param url
 */
export function getFlutterRealPath(url: string): string {
  // for apple
  return url.replace(/(\S+)(\/Documents\/)(\S*)/, `$3`)
}
/**
 * http://a.b.com/#/project?id=1 => a.b.com
 * wx => appId
 * @param url
 */
export function getRealPageOrigin(url: string): string {
  const fileStartReg = /^file:\/\//
  if (fileStartReg.test(url)) {
    return getFlutterRealOrigin(url)
  }
  if (isWxMiniEnv) {
    return getAppId()
  }
  return getRealPath(removeHashPath(url).replace(/(\S*)(\/\/)(\S+)/, '$3'))
}

export function removeHashPath(url: string): string {
  return url.replace(/(\S+)(\/#\/)(\S*)/, `$1`)
}

export function hashCode(str: string): number {
  let hash = 0
  if (str.length == 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}
