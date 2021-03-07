import { logger } from '@mitojs/utils'

describe('logger.ts', () => {
  it('should logger config enabled can take effect', () => {
    logger.bindOptions(true)
    expect(logger.getEnableStatus()).toBeTruthy()
    logger.disable()
    expect(logger.getEnableStatus()).toBeFalsy()
    logger.enable()
    expect(logger.getEnableStatus()).toBeTruthy()
  })
})
