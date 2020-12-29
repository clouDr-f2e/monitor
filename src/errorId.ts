import { ERRORTYPES, EVENTTYPES } from './common'
import { ReportDataType } from './types/transportData'
const allErrorNumber: unknown = {}
/**
 * error合并规则
 * @param data
 */
export default function createErrorId(data: ReportDataType): number | null {
  let id: any
  const originUrl = getRealPageOrigin(data.url)
  switch (data.type) {
    case ERRORTYPES.FETCH_ERROR:
      id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + originUrl
      break
    case ERRORTYPES.JAVASCRIPT_ERROR:
    case ERRORTYPES.VUE_ERROR:
    case ERRORTYPES.REACT_ERROR:
      id = data.type + data.name + data.message + originUrl
      break
    case ERRORTYPES.BUSINESS_ERROR:
    case ERRORTYPES.LOG_ERROR:
      id = data.customTag + data.type + data.name + originUrl
      break
    case ERRORTYPES.PROMISE_ERROR:
      id = generatePromiseErrorId(data, originUrl)
      break
    default:
      id = data.type + data.message + originUrl
      break
  }
  id = hashCode(id)
  if (allErrorNumber[id] > 1) {
    return null
  }
  if (typeof allErrorNumber[id] === 'number') {
    allErrorNumber[id]++
  } else {
    allErrorNumber[id] = 1
  }

  return id
}

function generatePromiseErrorId(data: ReportDataType, originUrl: string) {
  const locationUrl = getRealPath(data.url)
  if (data.name === EVENTTYPES.UNHANDLEDREJECTION) {
    return data.type + objectOrder(data.message) + originUrl
  }
  return data.type + data.name + objectOrder(data.message) + locationUrl
}

/**
 * 排序对象键值对
 * ../param reason promise.reject
 */
function objectOrder(reason: any) {
  const sortFn = (obj: any) => {
    return Object.keys(obj)
      .sort()
      .reduce((total, key) => {
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
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
 * http://a.b.com/#/project?id=1 => a.b.com
 * @param url
 */
export function getRealPageOrigin(url: string): string {
  return getRealPath(url.replace(/(\S+)(\/#\/)(\S*)/, `$1`).replace(/(\S*)(\/\/)(\S+)/, '$3'))
}

function hashCode(str: string): number {
  let hash = 0
  if (str.length == 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}
