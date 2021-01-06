import { isError, isExistProperty, isInstanceOf, nativeToString, variableTypeDetection } from '@/utils'

describe('is.ts', () => {
  it('should nativeToString var work', () => {
    expect(nativeToString).toBe(Object.prototype.toString)
  })
  it('should variableTypeDetection func work', () => {
    expect(variableTypeDetection.isNumber(1)).toBeTruthy()
    expect(variableTypeDetection.isString('')).toBeTruthy()
    expect(variableTypeDetection.isBoolean(true)).toBeTruthy()
    expect(variableTypeDetection.isNull(null)).toBeTruthy()
    expect(variableTypeDetection.isUndefined(undefined)).toBeTruthy()
    expect(variableTypeDetection.isSymbol(Symbol(1))).toBeTruthy()
    function fn() {}
    expect(variableTypeDetection.isFunction(fn)).toBeTruthy()
    expect(variableTypeDetection.isObject({})).toBeTruthy()
    expect(variableTypeDetection.isArray([])).toBeTruthy()
    expect(variableTypeDetection.isProcess(process)).toBeTruthy()
    expect(variableTypeDetection.isWindow(window)).toBeTruthy()
  })
  it('should isError func work', () => {
    expect(nativeToString).toBe(Object.prototype.toString)
  })
  it('should isInstanceOf func work', () => {
    expect(isInstanceOf([], Array)).toBeTruthy()
    expect(isInstanceOf('1', Array)).toBeFalsy()
  })
  it('should isExistProperty func work', () => {
    const obj = {
      test: 1
    }
    expect(isExistProperty(obj, 'test')).toBeTruthy()
    expect(isExistProperty(obj, 'test1')).toBeFalsy()
  })
  it('should isError func work', () => {
    const err = new Error('test')
    expect(isError(err)).toBeTruthy()
  })
})
