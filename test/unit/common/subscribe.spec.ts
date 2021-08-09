import { EVENTTYPES } from '@zyf2e/monitor-shared'
import { subscribeEvent, triggerHandlers } from '@zyf2e/monitor-core'

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
