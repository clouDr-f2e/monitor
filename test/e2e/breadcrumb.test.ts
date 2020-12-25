// import puppeteer from 'puppeteer'
// const timeout = 2000
// let page
// let browser
// describe('baidu', () => {
//   beforeAll(async () => {
//     browser = await puppeteer.launch()
//     page = await browser.newPage()
//     await page.goto('https://baidu.com')
//   })

//   afterAll(() => {
//     console.log('close')
//     browser.close()
//   })

//   it(
//     'should display "baidu" text on page',
//     async () => {
//       const text = await page.evaluate(() => document.body.textContent)
//       expect(text).toContain('baidu')
//     },
//     timeout
//   )
// })

it('t', () => {
  expect(1).toBe(1)
})
