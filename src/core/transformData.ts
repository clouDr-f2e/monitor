import { MITOHttp } from './replace'
import { ERRORTYPES, HTTP_CODE } from '../common'
import { getLocationHref, getTimestamp } from 'utils'
import { ResourceErrorTarget } from './handleEvents'
import { ReportDataType } from '../types/transportData'
import { globalVar } from '../common'
import { Severity } from '../utils/Severity'
import { fromHttpStatus } from 'utils/httpStatus'

export function httpTransform(data: MITOHttp): ReportDataType {
  let message = ''
  const { elapsedTime, time, method, traceId, type, status } = data
  if (status === 0) {
    message = elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时'
  } else {
    message = fromHttpStatus(status)
  }
  return {
    type: ERRORTYPES.FETCH_ERROR,
    url: getLocationHref(),
    time,
    elapsedTime,
    level: Severity.Low,
    message,
    name: `${type}--${method}`,
    request: {
      httpType: type,
      traceId,
      method,
      url: data.url,
      data: data.reqData || ''
    },
    response: {
      status: data.status,
      // statusText: data.statusText,
      data: status > HTTP_CODE.UNAUTHORIZED ? data.responseText : null
    }
  }
}

const resourceMap = {
  img: '图片',
  script: 'js脚本'
}

export function resourceTransform(target: ResourceErrorTarget): ReportDataType {
  return {
    type: ERRORTYPES.RESOURCE_ERROR,
    url: getLocationHref(),
    message: '资源地址: ' + (target.src.slice(0, 100) || target.href.slice(0, 100)),
    level: Severity.Low,
    time: getTimestamp(),
    name: `${resourceMap[target.localName] || target.localName}加载失败`
  }
}
