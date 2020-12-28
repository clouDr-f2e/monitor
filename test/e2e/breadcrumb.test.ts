import puppeteer from 'puppeteer'
const timeout = 2000
let page: puppeteer.Page
let browser: puppeteer.Browser
describe('baidu', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`) // 译者注：这句话的效果是打印到你的代码的控制台
    })
    await page.goto('https://baidu.com')
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
      const className = await page.evaluate(() => {
        return document.getElementById('lg').classList[0]
      })
      expect(className).toBe('s-p-top')
    },
    timeout
  )
})

it('t', () => {
  expect(1).toBe(1)
})
