import { MITOHttp } from './replace'
import { ERRORTYPES } from '../common'
import { getLocationHref, getTimestamp } from 'utils'
import { ResourceErrorTarget } from './handleEvents'
import { ReportDataType } from '../types/transportData'
import { globalVar } from '../common'
import { Severity } from '../utils/Severity'

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
    level: Severity.Normal,
    message: data.status ? '' : description,
    name: `httpType:${data.type} method:${data.method}`,
    request: {
      httpType: data.type,
      traceId: data.traceId,
      method: data.method,
      url: data.url,
      data: data.reqData || ''
    },
    response: {
      status: data.status,
      statusText: data.statusText,
      data: data.responseText || '',
      description
    }
  }
}

const resourceMap = {
  img: '图片',
  script: 'js脚本'
}

export function resourceTransform(target: ResourceErrorTarget): ReportDataType {
  // todo 移动端内嵌页面的资源地址同一个但是，每个手机的前缀不一样，会导致相同的问题，出现不同url，进而造成不同的errorId
  // file:///data/user/0/com.kangmeng.prescription/files/internet-drugstore/111/index.html#/chooseConsultType

  return {
    type: ERRORTYPES.RESOURCE_ERROR,
    url: getLocationHref(),
    message: '资源地址: ' + (target.src.slice(0, 1000) || target.href.slice(0, 1000)),
    level: Severity.Low,
    time: getTimestamp(),
    name: `${resourceMap[target.localName] || target.localName} 加载失败`
  }
}
