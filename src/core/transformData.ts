import { MITOHttp } from './replace'
import { ERRORTYPES, ERRORLEVELS } from '@/common'
import { getLocationHref, getTimestamp } from 'utils'
import { ResourceErrorTarget } from './handleEvents'
import { ReportDataType } from '@/types/transportData'

export function httpTransform(data: MITOHttp): ReportDataType {
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
      description: data.status === 0 ? 'XMLHttpRequest请求失败(可能原因:浏览器跨域限制、超时)' : data.responseText
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
