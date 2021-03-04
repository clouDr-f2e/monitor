import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES } from '@mito/shared'
import { vue3Url } from '@/test/config'
import { TransportDataType, BreadcrumbPushData } from '@mito/types'
import { version, name } from '../../../package.json'
import { Severity } from '@mito/utils'
import puppeteer from 'puppeteer'
import {} from '@mito/types'

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
        expect(data.type).toBe(ERRORTYPES.VUE_ERROR)
        expect(data.level).toBe(Severity.Normal)
        expect(data.name).toBe('TypeError')
        expect(data.level).toBe(Severity.Normal)
        expect(data.componentName).toBe('component <error-button>')
        expect(data.propsData).toEqual({ btnName: '点击:Vue3错误上报' })
        expect(data.message).toBe("Cannot set property 'a' of undefined(native event handler)")
        // stack is string
        expect(data.stack).toBeDefined()
        expect(authInfo.sdkName).toBe(name)
        expect(authInfo.sdkVersion).toBe(version)
        done()
      }
      uploadRequestHandles.push(uploadRequestHandle)
      page.click('#vueCodeError')
    },
    timeout
  )
})
