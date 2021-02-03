import { HandleEvents } from '@/browser/handleEvents'
import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, HTTPTYPE } from '@/common/constant'
import { breadcrumb, httpTransform, transportData } from '@/core'
import { EMethods } from '@/types'
import { MITOHttp } from '@/types/common'
import { getTimestamp } from '@/utils'
import { Severity } from '@/utils/Severity'

describe('handleEvents.ts', () => {
  afterEach(() => {
    breadcrumb.clear()
    transportData.queue.clear()
  })
  const mockData: MITOHttp = {
    type: HTTPTYPE.XHR,
    traceId: '',
    time: getTimestamp(),
    method: EMethods.Get,
    url: 'https://test.com',
    reqData: {
      test: 1
    },
    sTime: getTimestamp(),
    elapsedTime: 320,
    responseText: { message: 'ok' },
    status: 200,
    isSdkUrl: false
  }
  it('should handleHttp func work in status 200 http', () => {
    HandleEvents.handleHttp(mockData, BREADCRUMBTYPES.XHR)
    // for breadcrumb
    const stack = breadcrumb.getStack()
    expect(stack.length).toBe(1)
    expect(stack[0].type).toBe(BREADCRUMBTYPES.XHR)
    expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.HTTP)
    expect(stack[0].level).toBe(Severity.Info)
    expect(stack[0].data).toEqual(httpTransform(mockData))
    // for transportData
    expect(transportData.queue.getStack().length).toBe(0)
  })
  it('should handleHttp func work in status 0 http', () => {
    mockData.status = 0
    mockData.type = HTTPTYPE.FETCH
    HandleEvents.handleHttp(mockData, BREADCRUMBTYPES.FETCH)
    // for breadcrumb
    const stack = breadcrumb.getStack()
    const result = stack[0].data
    expect(stack.length).toBe(2)
    expect(stack[0].type).toBe(BREADCRUMBTYPES.FETCH)
    expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.HTTP)
    expect(stack[0].level).toBe(Severity.Info)
    expect(result).toMatchObject(httpTransform(mockData))
    expect(stack[1].type).toBe(BREADCRUMBTYPES.FETCH)
    expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(stack[1].level).toBe(Severity.Error)
    // for transportData
    expect(transportData.queue.getStack().length).toBe(1)
  })
})
