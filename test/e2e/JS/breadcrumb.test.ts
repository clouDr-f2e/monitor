import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES, ERRORTYPES } from '@/common'
import { version, name } from '../../../package.json'
import puppeteer from 'puppeteer'
import { BreadcrumbPushData, EMethods, TransportDataType } from '@/types/index'
import { Severity } from '@/utils/Severity'
import { jsUrl } from '@/test/config'
const timeout = 2000
let page: puppeteer.Page
let browser: puppeteer.Browser
describe('JS html', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
    })
    await page.goto(jsUrl)
  })

  afterAll(() => {
    console.log('close')
    browser.close()
  })

  it(
    'Code Error btn click',
    async () => {
      page.on('request', (request) => {
        if (request.method() === EMethods.Post && request.url().includes('error')) {
          const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
          expect(data.type).toBe(ERRORTYPES.JAVASCRIPT_ERROR)
          expect(data.level).toBe(Severity.Normal)
          expect(Array.isArray(data.stack)).toBeTruthy()
          expect(authInfo.sdkName).toBe(name)
          expect(authInfo.sdkVersion).toBe(version)
        }
      })
      await page.click('#codeErr')
      const stack: BreadcrumbPushData[] = await page.evaluate(() => {
        return window['__MITO__'].breadcrumb.stack
      })
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

  // it(
  //   'JS Code Error',
  //   async () => {
  //     await page.click('#codeErr')
  //     const stack: BreadcrumbPushData[] = await page.evaluate(() => {
  //       return window['__MITO__'].breadcrumb.stack
  //     })
  //     // click
  //     expect(stack[0].type).toBe(BREADCRUMBTYPES.CLICK)
  //     expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
  //     expect(stack[0].level).toBe(Severity.Info)
  //     console.log('MITO', stack)
  //     // code error
  //     expect(stack[1].type).toBe(BREADCRUMBTYPES.CODE_ERROR)
  //     expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
  //     expect(stack[1].level).toBe(Severity.Error)
  //     expect(stack.length).toBe(2)
  //   },
  //   timeout
  // )
})
