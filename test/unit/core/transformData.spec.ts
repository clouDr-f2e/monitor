import { ERRORTYPES, HTTPTYPE } from '@zyf2e/monitor-shared'
import { httpTransform, resourceTransform, getRealPath } from '@zyf2e/monitor-core'
import { EMethods, MITOHttp, ResourceErrorTarget } from '@zyf2e/monitor-types'
import { getLocationHref, fromHttpStatus, Severity, interceptStr } from '@zyf2e/monitor-utils'

describe('transformData.ts', () => {
  it('should resourceTransform func work', () => {
    const mockData: ResourceErrorTarget = {
      src: 'https://test.com/a.jpg',
      localName: 'img'
    }
    const originData = resourceTransform(mockData)
    expect(originData).toEqual({
      type: ERRORTYPES.RESOURCE_ERROR,
      url: getLocationHref(),
      message: `资源地址: ${interceptStr(mockData.src, 120)}`,
      level: Severity.Low,
      time: originData.time,
      name: `图片加载失败`
    })
  })
  it('should httpTransform func work', () => {
    const traceId = '123-321-456-654'
    const common: MITOHttp = {
      type: HTTPTYPE.XHR,
      time: 10000,
      method: EMethods.Get,
      traceId,
      url: 'https://test.com/a?test=1',
      reqData: {
        testData: 1
      },
      responseText: null
    }
    const mockData1: MITOHttp = {
      status: 0,
      elapsedTime: 10,
      ...common
    }
    expect(httpTransform(mockData1)).toEqual({
      url: getLocationHref(),
      type: ERRORTYPES.FETCH_ERROR,
      time: common.time,
      elapsedTime: mockData1.elapsedTime,
      level: Severity.Low,
      message: `http请求失败，失败原因：跨域限制或域名不存在 ${getRealPath(common.url)}`,
      name: `${common.type}--${common.method}`,
      request: {
        httpType: common.type,
        traceId,
        method: common.method,
        url: common.url,
        data: common.reqData
      },
      response: {
        status: mockData1.status,
        data: common.responseText
      }
    })
    const mockData2: MITOHttp = {
      status: 0,
      elapsedTime: 2000,
      ...common
    }
    expect(httpTransform(mockData2)).toEqual({
      url: getLocationHref(),
      type: ERRORTYPES.FETCH_ERROR,
      time: common.time,
      elapsedTime: mockData2.elapsedTime,
      level: Severity.Low,
      message: `http请求失败，失败原因：超时 ${getRealPath(common.url)}`,
      name: `${common.type}--${common.method}`,
      request: {
        httpType: common.type,
        traceId,
        method: common.method,
        url: common.url,
        data: common.reqData
      },
      response: {
        status: mockData2.status,
        data: common.responseText
      }
    })

    const mockData3: MITOHttp = {
      status: 429,
      elapsedTime: 2000,
      ...common
    }
    expect(httpTransform(mockData3)).toEqual({
      url: getLocationHref(),
      type: ERRORTYPES.FETCH_ERROR,
      time: common.time,
      elapsedTime: mockData3.elapsedTime,
      level: Severity.Low,
      message: `${fromHttpStatus(mockData3.status)} ${getRealPath(common.url)}`,
      name: `${common.type}--${common.method}`,
      request: {
        httpType: common.type,
        traceId,
        method: common.method,
        url: common.url,
        data: common.reqData
      },
      response: {
        status: mockData3.status,
        data: common.responseText
      }
    })
  })
})
