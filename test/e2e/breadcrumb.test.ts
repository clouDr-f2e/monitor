import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES } from '@/common'
import puppeteer from 'puppeteer'
import { BreadcrumbPushData } from '@/types/index'
import { Severity } from '@/utils/Severity'
const timeout = 2000
let page: puppeteer.Page
let browser: puppeteer.Browser
describe('JS html', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`) // 译者注：这句话的效果是打印到你的代码的控制台
    })
    await page.goto('http://localhost:2021/JS/index.html')
    // page.on('domcontentloaded', function () {
    //   console.log('domcontentloaded')
    // })
  })

  afterAll(() => {
    console.log('close')
    browser.close()
  })

  it(
    'init sdk',
    async () => {
      await page.click('#codeErr')
      const stack: BreadcrumbPushData[] = await page.evaluate(() => {
        return window['__MITO__'].breadcrumb.stack
      })
      // click
      expect(stack[0].type).toBe(BREADCRUMBTYPES.CLICK)
      expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
      expect(stack[0].level).toBe(Severity.Info)
      console.log('MITO', stack)
      // code error
      expect(stack[1].type).toBe(BREADCRUMBTYPES.CODE_ERROR)
      expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(stack[1].level).toBe(Severity.Error)
      expect(stack.length).toBe(2)
    },
    timeout
  )
})
