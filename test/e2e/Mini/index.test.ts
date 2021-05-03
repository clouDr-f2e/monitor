import MiniProgram from 'miniprogram-automator/out/MiniProgram'
import Page from 'miniprogram-automator/out/Page'
import { BreadcrumbPushData, EMethods, ReportDataType, TransportDataType, Replace } from '@mitojs/types'
import automator from 'miniprogram-automator'
import { resolve } from 'path'
import { SpanStatus, Severity } from '@mitojs/utils'
import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES, HTTPTYPE, SDK_NAME, SDK_VERSION } from '@mitojs/shared'
import { ServerUrls } from '../../../examples/server/config'

describe('Min e2e:', () => {
  const timeout = 60000 // 打开开发工具较慢
  const waitFor = 800
  let _miniProgram: MiniProgram
  let _page: Page

  async function getStack(): Promise<BreadcrumbPushData[]> {
    return await _miniProgram.evaluate(() => {
      return wx['__MITO__'].breadcrumb.stack as BreadcrumbPushData[]
    })
  }

  async function getRequestOptions(): Promise<WechatMiniprogram.RequestOption> {
    return await _miniProgram.evaluate(() => {
      return wx['__MITO_REQUEST__'] as WechatMiniprogram.RequestOption
    })
  }

  async function reset() {
    // 小程序没有保留拦截请求的方法， 暂时使用全局变量存储，每个用例清空一次
    return await _miniProgram.evaluate(() => {
      wx['__MITO__'].breadcrumb.stack = []
      wx['__MITO_REQUEST__'] = undefined
      return
    })
  }

  /**
   * 请确保本地安装了开发工具并打开了安全端口
   * 如何打开端口
   * 微信开发工具设置 -> 安全设置 -> 安全 -> 打开服务端口
   */
  beforeAll(async () => {
    let miniProgram: MiniProgram = await automator.launch({
      projectPath: resolve(__dirname, '../../../examples/Mini')
    })
    _miniProgram = miniProgram

    let page: Page = await miniProgram.reLaunch('/pages/automator/automator')
    await page.waitFor(waitFor)
    _page = page
  }, timeout)

  afterAll(() => {
    _miniProgram.close()
  }, timeout)

  beforeEach(async () => {
    await reset()
  }, timeout)

  it(
    'Code Error btn click，breadcrumb stack should add two and upload this error',
    async () => {
      const element = await _page.$('#click-err-btn')
      await element.tap()

      await _page.waitFor(waitFor)

      // 请求体
      const options = await getRequestOptions()

      const { authInfo, data } = options.data as TransportDataType

      expect((data as ReportDataType).type).toBe(ERRORTYPES.JAVASCRIPT_ERROR)
      expect((data as ReportDataType).level).toBe(Severity.Normal)
      expect(Array.isArray((data as ReportDataType).stack)).toBeTruthy()
      expect(authInfo.sdkName).toBe(SDK_NAME)
      expect(authInfo.sdkVersion).toBe(SDK_VERSION)

      const stack: BreadcrumbPushData[] = await getStack()

      //  click
      expect(stack[0].type).toBe(BREADCRUMBTYPES.TAP)
      expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
      expect(stack[0].level).toBe(Severity.Info)

      // code error
      expect(stack[1].type).toBe(BREADCRUMBTYPES.CODE_ERROR)
      expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(stack[1].level).toBe(Severity.Error)
      expect(stack.length).toBe(2)
    },
    timeout
  )

  it(
    'PromiseError，breadcrumb should add two and upload this error',
    async () => {
      const element = await _page.$('#click-promise-btn')
      await element.tap()

      await _page.waitFor(waitFor)

      const options = await getRequestOptions()

      const { authInfo, data } = options.data as TransportDataType

      expect((data as ReportDataType).name).toBe('unhandledrejection')
      expect((data as ReportDataType).type).toBe(ERRORTYPES.PROMISE_ERROR)
      expect((data as ReportDataType).level).toBe(Severity.Low)
      expect((data as ReportDataType).message).toBe('Promise reject str')
      expect(authInfo.sdkName).toBe(SDK_NAME)
      expect(authInfo.sdkVersion).toBe(SDK_VERSION)

      const stack: BreadcrumbPushData[] = await getStack()

      expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(stack[1].type).toBe(BREADCRUMBTYPES.UNHANDLEDREJECTION)
      expect(stack[1].level).toBe(Severity.Error)
      expect(stack.length).toBe(2)
    },
    timeout
  )

  // 没发请求
  // it(
  //   'A exception get XHR request，breadcrumb stack should add two and upload this error',
  //   async () => {
  //     const element = await _page.$('#click-request-btn')
  //     await element.tap()

  //     await _page.waitFor(waitFor)

  //     const options = await getRequestOptions()

  //     const { authInfo, data } = options.data as TransportDataType

  //     expect((data as ReportDataType).type).toBe(ERRORTYPES.FETCH_ERROR)
  //     expect((data as ReportDataType).level).toBe(Severity.Low)
  //     expect(authInfo.sdkName).toBe(SDK_NAME)
  //     expect(authInfo.sdkVersion).toBe(SDK_VERSION)

  //     const stack: BreadcrumbPushData[] = await getStack()

  //     expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.HTTP)
  //     expect(stack[1].type).toBe(BREADCRUMBTYPES.XHR)
  //     expect(stack[1].level).toBe(Severity.Info) // ?todo error
  //     expect((stack[1].data as ReportDataType).message).toBe('request:fail ')
  //     expect((stack[1].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
  //     expect((stack[1].data as ReportDataType).request.method).toBe(EMethods.Get)
  //     expect((stack[1].data as ReportDataType).request.url).toBe(ServerUrls.exceptionGet)

  //     // todo 没找到这项
  //     expect(stack[2].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
  //     expect(stack[2].type).toBe(BREADCRUMBTYPES.XHR)
  //     expect(stack[2].level).toBe(Severity.Error)
  //     expect((stack[2].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
  //     expect((stack[2].data as ReportDataType).message).toBe(`${SpanStatus.InternalError} ${ServerUrls.exceptionGet}`)
  //     expect((stack[2].data as ReportDataType).request.method).toBe(EMethods.Get)
  //     expect((stack[2].data as ReportDataType).request.url).toBe(ServerUrls.exceptionGet)
  //   },
  //   timeout
  // )

  // 没发请求
  // it(
  //   'Router error, should add two and upload this error',
  //   async () => {
  //     const element = await _page.$('#click-router-btn')
  //     await element.tap()

  //     await _page.waitFor(waitFor)

  //     const options = await getRequestOptions()

  //     const { authInfo, data } = options.data as TransportDataType

  //     const stack: BreadcrumbPushData[] = await getStack()

  //     expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.USER)
  //     expect(stack[1].type).toBe(BREADCRUMBTYPES.RESOURCE)
  //     expect(stack[1].level).toBe(Severity.Info) // ? error
  //     expect((stack[1].data as Replace.IRouter).from).toBe('pages/automator/automator?')
  //     expect((stack[1].data as Replace.IRouter).to).toBe('/pages/noRoute/index')
  //   },
  //   timeout
  // )

  it(
    'Download File error, should add three and upload this error',
    async () => {
      const element = await _page.$('#click-file-btn')
      await element.tap()

      await _page.waitFor(waitFor)

      const options = await getRequestOptions()

      const { authInfo, data } = options.data as TransportDataType

      expect((data as ReportDataType).name).toBe('xhr--GET')
      expect((data as ReportDataType).type).toBe(ERRORTYPES.FETCH_ERROR)
      expect((data as ReportDataType).level).toBe(Severity.Low)
      expect((data as ReportDataType).message).toBe('not_found https://www.baidu.com/downloadFile')
      expect(authInfo.sdkName).toBe(SDK_NAME)
      expect(authInfo.sdkVersion).toBe(SDK_VERSION)

      const stack: BreadcrumbPushData[] = await getStack()

      expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.HTTP)
      expect(stack[1].type).toBe(BREADCRUMBTYPES.XHR)
      expect(stack[1].level).toBe(Severity.Info)
      expect((stack[1].data as ReportDataType).message).toBe('not_found https://www.baidu.com/downloadFile')
      expect((stack[1].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
      expect((stack[1].data as ReportDataType).request.method).toBe(EMethods.Get)
      expect((stack[1].data as ReportDataType).request.url).toBe('https://www.baidu.com/downloadFile')

      expect(stack[2].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(stack[2].type).toBe(BREADCRUMBTYPES.XHR)
      expect(stack[2].level).toBe(Severity.Error)
      expect((stack[2].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
      expect((stack[2].data as ReportDataType).message).toBe('not_found https://www.baidu.com/downloadFile')
      expect((stack[2].data as ReportDataType).request.method).toBe(EMethods.Get)
      expect((stack[2].data as ReportDataType).request.url).toBe('https://www.baidu.com/downloadFile')
      expect(stack.length).toBe(3)
    },
    timeout
  )
})
