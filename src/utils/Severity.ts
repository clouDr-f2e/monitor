import { EVENTTYPES } from '@/common'

/** JSDoc */
export enum Severity {
  /** JSDoc */
  Else = 'else',
  /** JSDoc */
  Error = 'error',
  /** JSDoc */
  Warning = 'warning',
  /** JSDoc */
  Info = 'info',
  /** JSDoc */
  Debug = 'debug',
  /** JSDoc */
  NORMAL = 'normal',
  HIGH = 'high',
  Critical = 'critical'
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Severity {
  /**
   * Converts a string-based level into a {@link Severity}.
   *
   * @param level string representation of Severity
   * @returns Severity
   */
  export function fromString(level: string): Severity {
    switch (level) {
      case 'debug':
        return Severity.Debug
      case 'info':
      case 'log':
      case 'assert':
        return Severity.Info
      case 'warn':
      case 'warning':
        return Severity.Warning
      case '1':
      case '2':
      case '3':
      case '4':
      case 'error':
        return Severity.Error
      case 'critical':
        return Severity.Critical
      default:
        return Severity.Else
    }
  }
}
