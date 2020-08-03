import { MITOHttp } from './replace'
import { ERRORTYPES, ERRORLEVELS } from '@/common'
import { getLocationHref, getTimestamp } from 'utils'
import { ResourceErrorTarget } from './handleEvents'
import { ReportDataType } from '@/types/transportData'
import { globalVar } from '@/common'

export function httpTransform(data: MITOHttp): ReportDataType {
  let description = data.responseText
  if (data.status === 0) {
    description = data.elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制' : 'http请求失败，失败原因：超时'
  }
  return {
    type: ERRORTYPES.FETCH_ERROR,
    url: getLocationHref(),
    time: data.time,
    elapsedTime: data.elapsedTime,
    level: ERRORLEVELS.HIGH,
    request: {
      httpType: data.type,
      method: data.method,
      url: data.url,
      data: data.reqData || ''
    },
    response: {
      status: data.status,
      statusText: data.statusText,
      description
    }
  }
}

const resourceMap = {
  img: '图片',
  script: '脚本'
}

export function resourceTransform(target: ResourceErrorTarget): ReportDataType {
  return {
    type: ERRORTYPES.RESOURCE_ERROR,
    url: getLocationHref(),
    message: '资源地址: ' + (target.src || target.href),
    level: ERRORLEVELS.LOW,
    time: getTimestamp(),
    name: `${resourceMap[target.localName] || target.localName} failed to load`
  }
}
