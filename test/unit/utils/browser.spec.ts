import { htmlElementAsString } from '../../../src/utils/browser'

describe('browser.ts', () => {
  describe('htmlElementAsString function', () => {
    /**
     * @jest-environment jsdom
     */
    it('body Tag', () => {
      const ele = document.createElement('body')
      ele.className = 'my-class-name'
      expect(htmlElementAsString(ele)).toBeNull()
    })
    /**
     * @jest-environment jsdom
     */
    it('div Tag', () => {
      const ele = document.createElement('div')
      ele.innerText = 'testDiv'
      ele.className = 'my-class class-one'
      ele.id = 'test-id'
      const result = '<div id="test-id class="my-class class-one">testDiv</div>'
      expect(htmlElementAsString(ele)).toBe(result)
    })
  })
})
