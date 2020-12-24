test('test', () => {
  expect('a').toBe('a')
})
jest.fn((x) => 42 + x)
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}
const mockCallback = jest.fn((x) => 42 + x)
forEach([0, 1], mockCallback)

// 此 mock 函数被调用了两次
expect(mockCallback.mock.calls.length).toBe(2)

test('ceshi', () => {
  expect(mockCallback.mock.calls.length).toBe(2)
})

test('ceshi2', () => {
  expect(mockCallback.mock.calls.length).toBe(2)
})

test('ceshi2', () => {
  expect(mockCallback.mock.calls.length).toBe(2)
})

describe('一组', () => {
  test('ceshi3', () => {
    expect(mockCallback.mock.calls.length).toBe(2)
  })
})
