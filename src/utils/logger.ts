import { _global, _support } from './global'
const PREFIX = 'MITO Logger'

export class Logger {
  private enabled = true
  private _console: Console = {} as Console
  constructor() {
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
    logType.forEach((level) => {
      if (!(level in _global.console)) return
      this._console[level] = _global.console[level]
    })
  }
  disable(): void {
    this.enabled = false
  }

  bindOptions(debug: boolean): void {
    this.enabled = debug ? true : false
  }

  enable(): void {
    this.enabled = true
  }

  log(...args: any[]): void {
    if (!this.enabled) {
      return
    }
    this._console.log(`${PREFIX}[Log]:`, ...args)
  }
  warn(...args: any[]): void {
    if (!this.enabled) {
      return
    }
    this._console.warn(`${PREFIX}[Warn]:`, ...args)
  }
  error(...args: any[]): void {
    if (!this.enabled) {
      return
    }
    this._console.error(`${PREFIX}[Error]:`, ...args)
  }
}
const logger = _support.logger || (_support.logger = new Logger())
export { logger }
