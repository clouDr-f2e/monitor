import puppeteer from 'puppeteer'
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
    page.on('domcontentloaded', function () {
      console.log('domcontentloaded')
    })
  })

  afterAll(() => {
    console.log('close')
    browser.close()
  })

  it(
    'init sdk',
    async () => {
      const MITO = await page.evaluate(() => {
        return window['MITO']
      })
      console.log('MITO', MITO)
      expect(MITO).toBeDefined()
    },
    timeout
  )
})

it('t', () => {
  expect(1).toBe(1)
})
