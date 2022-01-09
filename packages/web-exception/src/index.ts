import { defaultReport } from './report';

export * from './types'
import { ERROR_TYPES, ExceptionOptions, ReportData, ReportDataContent, WebExceptionOptions } from './types';
import { ActionTracker } from './tracker'
import { getEnvironment } from './environment'
import { ErrorCatch } from './catch'

export class WebException {
  private options: Omit<ExceptionOptions, 'report'>
  actionTracker: ActionTracker
  errorCatch: ErrorCatch
  report: (source: any) => unknown
  log: (this: WebExceptionOptions, source: Partial<ReportDataContent>) => unknown

  constructor(options: WebExceptionOptions) {
    const { report, ...opts } = options;
    this.options = opts;
    this.report = typeof report === 'function' ? report : defaultReport;
    this.actionTracker = new ActionTracker({})
    this.log = this._log.bind(this)
    this.errorCatch = new ErrorCatch<ActionTracker>({
      actionTracker: this.actionTracker,
      log: this.log
    })
  }

  private _log(source: Partial<ReportDataContent>) {
    const authInfo = {}
    const breadcrumb = this.actionTracker.queue;
    const defaultData = {
      type: ERROR_TYPES.CUSTOM_ERROR,
      message: 'custom log error',
      apikey: this.options.apikey
    }
    const deviceInfo = getEnvironment();
    this.report({
      authInfo,
      breadcrumb,
      deviceInfo,
      data: {
        ...defaultData,
        ...source
      }
    })
  }
}

export const init = (options: WebExceptionOptions) => {
  return new WebException(options)
}
