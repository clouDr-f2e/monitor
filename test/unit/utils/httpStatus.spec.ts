import { fromHttpStatus, SpanStatus } from '@zyf2e/monitor-utils'

describe('httpStatus.ts', () => {
  it('should fromHttpStatus func work', () => {
    expect(fromHttpStatus(399)).toBe(SpanStatus.Ok)
    expect(fromHttpStatus(200)).toBe(SpanStatus.Ok)
    expect(fromHttpStatus(401)).toBe(SpanStatus.Unauthenticated)
    expect(fromHttpStatus(403)).toBe(SpanStatus.PermissionDenied)
    expect(fromHttpStatus(404)).toBe(SpanStatus.NotFound)
    expect(fromHttpStatus(409)).toBe(SpanStatus.AlreadyExists)
    expect(fromHttpStatus(413)).toBe(SpanStatus.FailedPrecondition)
    expect(fromHttpStatus(429)).toBe(SpanStatus.ResourceExhausted)
    expect(fromHttpStatus(430)).toBe(SpanStatus.InvalidArgument)
    expect(fromHttpStatus(455)).toBe(SpanStatus.InvalidArgument)
    expect(fromHttpStatus(500)).toBe(SpanStatus.InternalError)
    expect(fromHttpStatus(501)).toBe(SpanStatus.Unimplemented)
    expect(fromHttpStatus(503)).toBe(SpanStatus.Unavailable)
    expect(fromHttpStatus(504)).toBe(SpanStatus.DeadlineExceeded)
    expect(fromHttpStatus(700)).toBe(SpanStatus.UnknownError)
  })
})
