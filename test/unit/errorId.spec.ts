import { ERRORTYPES } from '@/common/common'
import createErrorId, { getRealPageOrigin, getRealPath } from '@/errorId'
import { ReportDataType } from '@/types'
import { Severity } from '@/utils/Severity'

describe('验证createErrorId生成的id', () => {
  it('两个http Error应该生成不同的errorId', () => {
    const httpError_1: ReportDataType = {
      type: ERRORTYPES.FETCH_ERROR,
      url: 'http://localhost:2021/JS/index.html',
      time: 1609210351040,
      elapsedTime: 948,
      level: 'low',
      message: 'http请求失败，失败原因：跨域限制或域名不存在',
      name: 'xhr--GET',
      request: { httpType: 'xhr', method: 'GET', url: 'http://aaaa.aaa/info2', data: '' },
      response: { status: 0, data: '' }
    }

    const httpError_2: ReportDataType = {
      type: ERRORTYPES.FETCH_ERROR,
      url: 'http://localhost:2021/JS/index.html',
      time: 1609210351040,
      elapsedTime: 948,
      level: 'low',
      message: 'http请求失败，失败原因：跨域限制或域名不存在',
      name: 'xhr--GET',
      request: { httpType: 'xhr', method: 'POST', url: 'http://aaaa.aaa/info2', data: '' },
      response: { status: 0, data: '' }
    }
    const errorId_1 = createErrorId(httpError_1)
    const errorId_2 = createErrorId(httpError_2)
    expect(errorId_1).not.toBe(errorId_2)
  })

  it('两个相同的httpError应该生成相同的id', () => {
    const httpError_3: ReportDataType = {
      type: ERRORTYPES.FETCH_ERROR,
      url: 'http://localhost:2021/JS/index.html',
      time: 1609210351040,
      elapsedTime: 948,
      level: 'low',
      message: 'http请求失败，失败原因：跨域限制或域名不存在',
      name: 'xhr--GET',
      request: { httpType: 'xhr', method: 'GET', url: 'http://aaaa', data: '' },
      response: { status: 0, data: '' }
    }
    const errorId_1 = createErrorId(httpError_3)
    const errorId_2 = createErrorId(httpError_3)
    expect(errorId_1).toBe(errorId_2)
  })

  it('两个相同的对象，但顺序不同，但是结果应该是相同', () => {
    const logError_1: ReportDataType = {
      type: ERRORTYPES.LOG_ERROR,
      level: Severity.Critical,
      message: '{"one":111}',
      name: 'MITO.log',
      customTag: '测试',
      time: 1609211248523,
      url: 'http://localhost:2021/JS/index.html'
    }
    const logError_2: ReportDataType = {
      message: '{"one":111}',
      name: 'MITO.log',
      customTag: '测试',
      time: 1609211248523,
      level: Severity.Critical,
      type: ERRORTYPES.LOG_ERROR,
      url: 'http://localhost:2021/JS/index.html'
    }
    const errorId_1 = createErrorId(logError_1)
    const errorId_2 = createErrorId(logError_2)
    expect(errorId_1).toBe(errorId_2)
  })

  it('一个错误对象生成两次后，第三次会返回null', () => {
    const logError_1: ReportDataType = {
      type: ERRORTYPES.LOG_ERROR,
      level: Severity.Critical,
      message: '{"one":111}',
      name: 'MITO.log',
      customTag: '测试',
      time: 1609211248523,
      url: 'http://localhost:2021/JS/index.html'
    }
    const errorId_1 = createErrorId(logError_1)
    const errorId_2 = createErrorId(logError_1)
    const errorId_3 = createErrorId(logError_1)
    expect(errorId_1).toBe(errorId_2)
    expect(errorId_3).toBeNull()
  })
})

describe('getRealPath should work', () => {
  it('删除多余的query参数', () => {
    const url = 'http://a/b/c/project?id=1#a'
    expect(getRealPath(url)).toBe('http://a/b/c/project')
  })

  it('去掉多余{param}', () => {
    const url = 'http://a/b/c/project/info/18'
    expect(getRealPath(url)).toBe('http://a/b/c/project/info{param}')
  })
})

describe('getRealPageOrigin should work', () => {
  it('获取hash路由的前半段&&去掉http前缀', () => {
    const url = 'http://a.b.com/#/project?id=1'
    expect(getRealPageOrigin(url)).toBe('a.b.com')
  })
  // todo 需要支持browser history
})
