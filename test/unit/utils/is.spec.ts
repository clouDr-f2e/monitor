import { variableTypeDetection } from '../../../src/utils/is'
test('variableTypeDetection', () => {
  const arr = []
  expect(variableTypeDetection.isArray(arr)).toBe(true)
})
