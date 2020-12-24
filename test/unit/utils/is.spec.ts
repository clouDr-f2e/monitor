import { isArray, variableTypeDetection } from '../../../src/utils/is'
test('variableTypeDetection', () => {
  const arr = []
  expect(variableTypeDetection.isArray(arr)).toBe(true)
  expect(isArray(arr)).toBe(true)
})
