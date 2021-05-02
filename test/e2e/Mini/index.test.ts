import MiniProgram from 'miniprogram-automator/out/MiniProgram'
import Page from 'miniprogram-automator/out/Page'
import { BreadcrumbPushData, EMethods, ReportDataType, TransportDataType } from '@mitojs/types'
import automator from 'miniprogram-automator'
import { resolve } from 'path'
import { SpanStatus, Severity } from '@mitojs/utils'
import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES, HTTPTYPE, SDK_NAME, SDK_VERSION } from '@mitojs/shared'

describe('Min e2e:', () => {
  const timeout = 60000 // 打开开发工具较慢
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

  async function resetBreadcrumb() {
    return await _miniProgram.evaluate(() => {
      wx['__MITO__'].breadcrumb.stack = []
      return
    })
  }

  beforeAll(async () => {
    console.log('-- beforeAll --')
    let miniProgram: MiniProgram = await automator.launch({
      projectPath: resolve(__dirname, '../../../examples/Mini')
    })
    _miniProgram = miniProgram

    let page: Page = await miniProgram.reLaunch('/pages/automator/automator')
    await page.waitFor(500)
    _page = page
  }, timeout)

  afterAll(() => {
    console.log('-- afterAll --')
    // _miniProgram.close()
  }, timeout)

  beforeEach(async () => {
    console.log('-- beforeEach --')
    await resetBreadcrumb()
  }, timeout)

  it(
    'Code Error btn click，breadcrumb stack should add two and upload this error',
    async () => {
      const element = await _page.$('#click-err-btn')
      await element.tap()

      // 请求体
      const options = await getRequestOptions()
      const { authInfo, data } = JSON.parse(options.data as string) as TransportDataType
      expect((data as ReportDataType).type).toBe(ERRORTYPES.JAVASCRIPT_ERROR)
      expect((data as ReportDataType).level).toBe(Severity.Normal)
      // @ts-ignore
      expect(Array.isArray((data as ReportDataType).stacks)).toBeTruthy()
      expect(authInfo.sdkName).toBe(SDK_NAME)
      expect(authInfo.sdkVersion).toBe(SDK_VERSION)

      // console.log('options = ', options)

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

  // it(
  //   'test http2',
  //   async () => {
  //     const element = await _page.$('#click-request-btn2')
  //     await element.tap()

  //     const options = await getRequestOptions()

  //     console.log('options = ', options)
  //     expect(options.url).toBe('http://www.baidu.com2')
  //   },
  //   timeout
  // )

  // it('', async () => {}, timeout)
})
