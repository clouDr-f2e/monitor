// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer')
const timeout = 5000
let page
describe('baidu', () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto('https://baidu.com')
  })

  it(
    'should display "baidu" text on page',
    async () => {
      const text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('baidu')
    },
    timeout
  )
})
