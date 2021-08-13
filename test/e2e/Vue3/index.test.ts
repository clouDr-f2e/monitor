import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES, SDK_NAME, SDK_VERSION } from '@zyf2e/monitor-shared'
import { vue3Url } from '@/test/config'
import { TransportDataType, BreadcrumbPushData, ReportDataType } from '@zyf2e/monitor-types'
import { Severity } from '@zyf2e/monitor-utils'
import puppeteer from 'puppeteer'
import {} from '@zyf2e/monitor-types'

describe('Vue3 e2e', () => {
  const timeout = 3000
  let page: puppeteer.Page
  let browser: puppeteer.Browser
  const uploadRequestHandles = []
  const finishedRequestHandles = []
  async function getStack() {
    return await page.evaluate(() => {
      return window['__MITO__'].breadcrumb.stack as BreadcrumbPushData[]
    })
  }
  beforeEach(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    // page.on('console', (msg) => {
    //   for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
    // })
    await page.goto(vue3Url)
    page.on('request', (request) => {
      if (request.url().includes('/errors/upload') && uploadRequestHandles.length > 0) {
        uploadRequestHandles.shift()(request)
      }
    })
    page.on('requestfinished', (request) => {
      if (finishedRequestHandles.length > 0) {
        finishedRequestHandles.shift()(request)
      }
    })
  })

  afterEach(async () => {
    browser.close()
  })

  afterAll(() => {
    browser.close()
  })

  it(
    'vue code error',
    async (done) => {
      async function uploadRequestHandle(request: puppeteer.Request) {
        // breadcrumb valid
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(stack[1].type).toBe(BREADCRUMBTYPES.VUE)
        expect(stack[1].level).toBe(Severity.Error)
        // upload
        const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
        expect((data as ReportDataType).type).toBe(ERRORTYPES.VUE_ERROR)
        expect((data as ReportDataType).level).toBe(Severity.Normal)
        expect((data as ReportDataType).name).toBe('TypeError')
        expect((data as ReportDataType).level).toBe(Severity.Normal)
        expect((data as ReportDataType).componentName).toBe('component <error-button>')
        expect((data as ReportDataType).propsData).toEqual({ btnName: '点击:Vue3错误上报' })
        expect((data as ReportDataType).message).toBe("Cannot set property 'a' of undefined(native event handler)")
        // stack is string
        expect((data as ReportDataType).stack).toBeDefined()
        expect(authInfo.sdkName).toBe(SDK_NAME)
        expect(authInfo.sdkVersion).toBe(SDK_VERSION)
        done()
      }
      uploadRequestHandles.push(uploadRequestHandle)
      page.click('#vueCodeError')
    },
    timeout
  )
})
