import { nativeTryCatch } from '@mito/utils'

describe('exception.ts', () => {
  it('should nativeTryCatch func work', () => {
    const errMsg = 'unti'
    const throwErrorFunc = () => {
      throw new Error(errMsg)
    }
    nativeTryCatch(throwErrorFunc, (err: Error) => {
      expect(err.message).toBe(errMsg)
    })
  })
  it("should nativeTryCatch's two params not run under normal circumstances", () => {
    const normalFun = () => {
      const a = 1
      a + 1 === 2
    }
    let isRun = false
    nativeTryCatch(normalFun, () => {
      isRun = true
    })
    expect(isRun).toBeFalsy()
  })
})
