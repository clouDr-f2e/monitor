/** JSDoc */
export enum Severity {
  /** JSDoc */
  Log = 'log',
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
      case '1':
        return Severity.Critical
      case '2':
        return Severity.HIGH
      case '3':
        return Severity.NORMAL
      case 'debug':
        return Severity.Debug
      case 'info':
        return Severity.Info
      case 'warn':
      case 'warning':
        return Severity.Warning
      case 'error':
        return Severity.Error
      case 'critical':
        return Severity.Critical
      case 'log':
      default:
        return Severity.Log
    }
  }
}
