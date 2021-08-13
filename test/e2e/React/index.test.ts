import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES, SDK_NAME, SDK_VERSION } from '@zyf2e/monitor-shared'
import { reactUrl } from '@/test/config'
import { ReportDataType, TransportDataType } from '@zyf2e/monitor-types'
import { Severity } from '@zyf2e/monitor-utils'
import puppeteer from 'puppeteer'
import { BreadcrumbPushData } from '@zyf2e/monitor-types'

describe('React e2e', () => {
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
    await page.goto(reactUrl)
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
    'errorboundary capture react render error:breadcrumb should add one and upload this error',
    async (done) => {
      async function uploadRequestHandle(request: puppeteer.Request) {
        // breadcrumb valid
        const stack = await getStack()
        expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(stack[0].type).toBe(BREADCRUMBTYPES.REACT)
        expect(stack[0].level).toBe(Severity.Error)
        expect(stack[0].data).toBe('Error: I crashed!')
        // upload
        const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
        expect((data as ReportDataType).type).toBe(ERRORTYPES.REACT_ERROR)
        expect((data as ReportDataType).level).toBe(Severity.Normal)
        expect((data as ReportDataType).name).toBe('Error')
        expect((data as ReportDataType).level).toBe(Severity.Normal)
        expect((data as ReportDataType).message).toBe('I crashed!')
        // stack is array
        expect(Array.isArray((data as ReportDataType).stack)).toBeTruthy()
        expect(authInfo.sdkName).toBe(SDK_NAME)
        expect(authInfo.sdkVersion).toBe(SDK_VERSION)
        done()
      }
      uploadRequestHandles.push(uploadRequestHandle)
      page.click('#numException')
      page.click('#numException')
      page.click('#numException')
    },
    timeout
  )
})
