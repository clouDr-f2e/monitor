import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES, HTTPTYPE } from '@/common'
import { version, name } from '../../../package.json'
import puppeteer from 'puppeteer'
import { BreadcrumbPushData, EMethods, ReportDataType, TransportDataType } from '@/types/index'
import { Severity } from '@/utils/Severity'
import { jsUrl } from '@/test/config'
import { SpanStatus } from '@/utils/httpStatus'

describe('Native JS e2e', () => {
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
    await page.goto(jsUrl)
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
    'Code Error btn click，breadcrumb stack should add two and upload this error',
    async () => {
      function interceptRequest(request: puppeteer.Request) {
        const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
        expect(data.type).toBe(ERRORTYPES.JAVASCRIPT_ERROR)
        expect(data.level).toBe(Severity.Normal)
        expect(Array.isArray(data.stack)).toBeTruthy()
        expect(authInfo.sdkName).toBe(name)
        expect(authInfo.sdkVersion).toBe(version)
      }
      uploadRequestHandles.push(interceptRequest)
      await page.click('#codeErr')
      const stack: BreadcrumbPushData[] = await getStack()
      // click
      expect(stack[0].type).toBe(BREADCRUMBTYPES.CLICK)
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
    'a normal get XHR request，breadcrumb stack should add one',
    (done) => {
      async function requestfinishedHandle(request: puppeteer.Request) {
        if (request.method() === EMethods.Get && request.url().includes('/normal')) {
          const stack = await getStack()
          expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.HTTP)
          expect(stack[1].type).toBe(BREADCRUMBTYPES.XHR)
          expect(stack[1].level).toBe(Severity.Info)
          expect((stack[1].data as ReportDataType).message).toBe(SpanStatus.Ok)
          expect((stack[1].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
          expect((stack[1].data as ReportDataType).request.method).toBe(EMethods.Get)
          expect((stack[1].data as ReportDataType).request.url).toBe('/normal')
        }
        done()
      }
      finishedRequestHandles.push(requestfinishedHandle)
      page.click('#normalReq')
    },
    timeout
  )

  it(
    'a exception get XHR request，breadcrumb stack should add two and upload this error',
    (done) => {
      async function requestfinishedHandle(request: puppeteer.Request) {
        // if (request.method() === EMethods.Get && request.url().includes('/exception')) {
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.HTTP)
        expect(stack[1].type).toBe(BREADCRUMBTYPES.XHR)
        expect(stack[1].level).toBe(Severity.Info)
        expect((stack[1].data as ReportDataType).message).toBe(SpanStatus.InternalError)
        expect((stack[1].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
        expect((stack[1].data as ReportDataType).request.method).toBe(EMethods.Get)
        expect((stack[1].data as ReportDataType).request.url).toBe('/exception')

        expect(stack[2].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(stack[2].type).toBe(BREADCRUMBTYPES.XHR)
        expect(stack[2].level).toBe(Severity.Error)
        expect((stack[2].data as ReportDataType).request.httpType).toBe(HTTPTYPE.XHR)
        expect((stack[2].data as ReportDataType).message).toBe(SpanStatus.InternalError)
        expect((stack[2].data as ReportDataType).request.method).toBe(EMethods.Get)
        expect((stack[2].data as ReportDataType).request.url).toBe('/exception')
        done()
        // }
      }
      finishedRequestHandles.push(requestfinishedHandle)
      function interceptedRequest(request: puppeteer.Request) {
        const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
        expect(data.type).toBe(ERRORTYPES.FETCH_ERROR)
        expect(data.level).toBe(Severity.Low)
        expect(authInfo.sdkName).toBe(name)
        expect(authInfo.sdkVersion).toBe(version)
      }
      uploadRequestHandles.push(interceptedRequest)
      page.click('#exceptionReq')
    },
    timeout
  )

  it(
    'a normal post fetch request，breadcrumb stack should add one',
    (done) => {
      async function requestfinishedHandle() {
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.HTTP)
        expect(stack[1].type).toBe(BREADCRUMBTYPES.FETCH)
        expect(stack[1].level).toBe(Severity.Info)
        expect((stack[1].data as ReportDataType).message).toBe(SpanStatus.Ok)
        expect((stack[1].data as ReportDataType).request.httpType).toBe(HTTPTYPE.FETCH)
        expect((stack[1].data as ReportDataType).request.method).toBe(EMethods.Post)
        expect((stack[1].data as ReportDataType).request.url).toBe('/normal/post')
        done()
      }
      finishedRequestHandles.push(requestfinishedHandle)
      page.click('#normalFetch')
    },
    timeout
  )

  it(
    'a exception post fetch request，breadcrumb stack should add two and upload this error',
    (done) => {
      async function requestfinishedHandle() {
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.HTTP)
        expect(stack[1].type).toBe(BREADCRUMBTYPES.FETCH)
        expect(stack[1].level).toBe(Severity.Info)
        expect((stack[1].data as ReportDataType).message).toBe(SpanStatus.InternalError)
        expect((stack[1].data as ReportDataType).request.httpType).toBe(HTTPTYPE.FETCH)
        expect((stack[1].data as ReportDataType).request.method).toBe(EMethods.Post)
        expect((stack[1].data as ReportDataType).request.url).toBe('/exception/post')

        expect(stack[2].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(stack[2].type).toBe(BREADCRUMBTYPES.FETCH)
        expect(stack[2].level).toBe(Severity.Error)
        expect((stack[2].data as ReportDataType).request.httpType).toBe(HTTPTYPE.FETCH)
        expect((stack[2].data as ReportDataType).message).toBe(SpanStatus.InternalError)
        expect((stack[2].data as ReportDataType).request.method).toBe(EMethods.Post)
        expect((stack[2].data as ReportDataType).request.data).toBe(JSON.stringify({ test: '测试请求体' }))
        expect((stack[2].data as ReportDataType).request.url).toBe('/exception/post')
        done()
      }
      finishedRequestHandles.push(requestfinishedHandle)
      function interceptedRequest(request: puppeteer.Request) {
        const { data } = JSON.parse(request.postData()) as TransportDataType
        expect(data.type).toBe(ERRORTYPES.FETCH_ERROR)
        expect(data.level).toBe(Severity.Low)
      }
      uploadRequestHandles.push(interceptedRequest)
      page.click('#exceptionFetch')
    },
    timeout
  )

  it(
    'manual report，breadcrumb should add one and upload this error',
    async (done) => {
      async function interceptedRequest(request: puppeteer.Request) {
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.DEBUG)
        expect(stack[1].type).toBe(BREADCRUMBTYPES.CUSTOMER)
        expect(stack[1].level).toBe(Severity.Error)
        const { data } = JSON.parse(request.postData()) as TransportDataType
        expect(data.customTag).toBe('测试')
        expect(data.name).toBe('MITO.log')
        expect(data.type).toBe(ERRORTYPES.LOG_ERROR)
        expect(data.level).toBe(Severity.Critical)
        expect(data.message).toBe(JSON.stringify({ one: 111 }))
        done()
      }
      uploadRequestHandles.push(interceptedRequest)
      await page.click('#logUpload')
    },
    timeout
  )

  it(
    'promiseError，breadcrumb should add one and upload this error',
    async (done) => {
      async function interceptedRequest(request: puppeteer.Request) {
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(stack[1].type).toBe(BREADCRUMBTYPES.UNHANDLEDREJECTION)
        expect(stack[1].level).toBe(Severity.Error)
        const { data } = JSON.parse(request.postData()) as TransportDataType
        expect(data.name).toBe('unhandledrejection')
        expect(data.type).toBe(ERRORTYPES.PROMISE_ERROR)
        expect(data.level).toBe(Severity.Low)
        expect(data.message).toBe('promise reject')
        done()
      }
      uploadRequestHandles.push(interceptedRequest)
      await page.click('#promiseError')
    },
    timeout
  )
})
