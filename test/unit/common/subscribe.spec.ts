import { EVENTTYPES } from '@mito/common'
import { subscribeEvent, triggerHandlers } from '@mito/common'

describe('subscribe.ts', () => {
  it('should subscribe work', () => {
    let isRun = false
    const tempData = { test: 1 }
    let callBackData
    subscribeEvent({
      type: EVENTTYPES.MITO,
      callback: (data) => {
        isRun = true
        callBackData = data
      }
    })
    triggerHandlers(EVENTTYPES.MITO, tempData)
    expect(isRun).toBeTruthy()
    expect(callBackData).toEqual(tempData)
  })
})
