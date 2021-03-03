import { Severity } from '@mito/utils'

describe('Severity.ts', () => {
  it('should fromString func work', () => {
    expect(Severity.fromString('debug')).toBe(Severity.Debug)
    expect(Severity.fromString('info')).toBe(Severity.Info)
    expect(Severity.fromString('log')).toBe(Severity.Info)
    expect(Severity.fromString('assert')).toBe(Severity.Info)
    expect(Severity.fromString('warn')).toBe(Severity.Warning)
    expect(Severity.fromString('warning')).toBe(Severity.Warning)
    expect(Severity.fromString(Severity.Low)).toBe(Severity.Error)
    expect(Severity.fromString(Severity.Normal)).toBe(Severity.Error)
    expect(Severity.fromString(Severity.High)).toBe(Severity.Error)
    expect(Severity.fromString(Severity.Critical)).toBe(Severity.Error)
    expect(Severity.fromString('error')).toBe(Severity.Error)
    expect(Severity.fromString('error else')).toBe(Severity.Else)
  })
})
