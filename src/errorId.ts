import { ERRORTYPES } from './common'
import { ReportDataType } from './types/transportData'
const allErrorNumber: unknown = {}
/**
 * 优化error合并规则
 * ../param data
 */
export default function createErrorId(data: ReportDataType): number | null {
  let id: any
  const locationUrl = getRealPath(data.url)
  switch (data.type) {
    case ERRORTYPES.FETCH_ERROR:
      id = data.type + data.request.method + data.response.status + getRealPath(data.request.url)
      break
    case ERRORTYPES.JAVASCRIPT_ERROR:
    case ERRORTYPES.VUE_ERROR:
      id = data.type + data.name + data.message + locationUrl
      break
    case ERRORTYPES.BUSINESS_ERROR:
    case ERRORTYPES.LOG_ERROR:
      id = data.type + data.name + data.message + locationUrl
      break
    case ERRORTYPES.PROMISE_ERROR:
      id = data.type + objectOrder(data.message) + locationUrl
      break
    default:
      id = data.type + data.message + locationUrl
      break
  }
  id = hashCode(id)
  if (typeof allErrorNumber[id] === 'number') {
    allErrorNumber[id]++
  } else {
    allErrorNumber[id] = 1
  }
  // 如果当前应用的errorId重复两次，就认为这个错误没必要再次上传到服务端
  if (allErrorNumber[id] > 2) {
    return null
  }
  return id
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

function getRealPath(url: string): string {
  return url.replace(/\?.*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1')
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
