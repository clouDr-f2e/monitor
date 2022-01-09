import { BREADCRUMB_TYPES, ERROR_TYPES, ErrorCatchOptions } from '../types';
import { ActionTracker } from '../tracker';
import { parseErrorStack } from './parseStack';

export class ErrorCatch<T extends ActionTracker = ActionTracker> {
  options: ErrorCatchOptions<T>
  actionTracker: T

  constructor(options: ErrorCatchOptions<T>) {
    this.options = options
    this.actionTracker = options.actionTracker
    this.monitorWindowError();
  }

  monitorWindowError() {
    window.addEventListener('error', (e: any) => {
      const { log } = this.options
      if (e instanceof ErrorEvent) {
        // 错误
        const { error } = e;
        const { message, name } = error as Error;
        const processedErrorStack = parseErrorStack(error)
        this.actionTracker.push({
          type: BREADCRUMB_TYPES.CODE_ERROR,
          data: {
            message,
            stack: processedErrorStack,
            name
          }
        })
        return log({
          message,
          name,
          stack: processedErrorStack,
          type: ERROR_TYPES.JAVASCRIPT_ERROR
        })
      } else if (e instanceof Event) {
        const { target } = e;
        console.log('resource error', e);
        return log({
          message: 'resource error',
          type: ERROR_TYPES.RESOURCE_ERROR
        })
      }
    }, true)

    window.addEventListener('unhandledrejection', (e) => {
      console.log(e);
    })
  }
}
