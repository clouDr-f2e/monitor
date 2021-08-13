import { BREADCRUMBTYPES } from '@zyf2e/monitor-shared'
import { breadcrumb, log } from '@zyf2e/monitor-core'
import { Severity } from '@zyf2e/monitor-utils'

describe('external log function', () => {
  it('should log func work', () => {
    const message = 'error info'
    const tag = 'error tag'
    const level = Severity.High
    log({
      message,
      tag,
      level
    })
    const stack = breadcrumb.getStack()
    expect(stack.length).toBe(1)
    expect(stack[0].type).toBe(BREADCRUMBTYPES.CUSTOMER)
    expect(stack[0].level).toBe(Severity.Error)
    expect(stack[0].data).toBe(message)
    expect(breadcrumb.getStack().length).toBe(1)
  })
})
