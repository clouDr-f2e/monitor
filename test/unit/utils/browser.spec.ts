import { extractErrorStack, htmlElementAsString, parseUrlToObj, Severity } from '@zyf2e/monitor-utils'

describe('browser.ts', () => {
  describe('htmlElementAsString function', () => {
    it('should return null if ele is body', () => {
      const ele = document.createElement('body')
      ele.className = 'my-class-name'
      expect(htmlElementAsString(ele)).toBeNull()
    })

    it('should work on div tag', () => {
      const ele = document.createElement('div')
      ele.innerText = 'testDiv'
      ele.className = 'my-class class-one'
      ele.id = 'test-id'
      const result = '<div id="test-id" class="my-class class-one">testDiv</div>'
      expect(htmlElementAsString(ele)).toBe(result)
    })
  })
  it('parseUrlToObj function should work', () => {
    const url = 'http://a.b.com/c/JS/index/abc?a=1'
    const result = {
      host: 'a.b.com',
      path: '/c/JS/index/abc',
      protocol: 'http',
      relative: '/c/JS/index/abc?a=1'
    }
    expect(parseUrlToObj(url)).toEqual(result)
    expect(parseUrlToObj('')).toEqual({})
  })
  it('should extractErrorStack func work parsed on object Error ', () => {
    try {
      const a = 6
      const b = a as unknown as String
      b.split(',')
    } catch (error) {
      const level = Severity.Normal
      const errInfo = extractErrorStack(error, level)
      expect(errInfo.level).toBe(level)
      expect(errInfo.message).toBe('b.split is not a function')
      expect(errInfo.name).toBe('TypeError')
    }

    //todo UNKNOWN_FUNCTION
  })
})
