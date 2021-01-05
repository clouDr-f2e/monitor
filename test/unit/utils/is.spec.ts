import { variableTypeDetection } from '@/utils'

describe('is.ts', () => {
  it('variableTypeDetection', () => {
    const arr = []
    expect(variableTypeDetection.isArray(arr)).toBe(true)
  })
})
