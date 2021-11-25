/**
 * @param beforeHandler
 * @param afterHandler
 */
function proxyXhr(beforeHandler: (...args: Array<any>) => void, afterHandler: (...args: Array<any>) => void): void {
  if ('XMLHttpRequest' in window && !window.__monitor_xhr__) {
    const origin = window.XMLHttpRequest
    const originOpen = origin.prototype.open
    window.__monitor_xhr__ = true
    origin.prototype.open = function (this: XMLHttpRequest, ...args: Array<any>) {
      beforeHandler && beforeHandler(args[1])
      originOpen.apply(this, args)
      this.addEventListener('loadend', () => {
        afterHandler && afterHandler(args[1])
      })
    }
  }
}

/**
 * @param beforeHandler
 * @param afterHandler
 */
function proxyFetch(beforeHandler: (...args: Array<any>) => void, afterHandler: (...args: Array<any>) => void): void {
  if ('fetch' in window && !window.__monitor_fetch__) {
    const origin = window.fetch
    window.__monitor_fetch__ = true
    window.fetch = function (resource: string, init: Partial<Request>) {
      beforeHandler && beforeHandler(resource, init)
      return origin.call(window, resource, init).then(
        (response: Response) => {
          afterHandler && afterHandler(resource, init)
          return response
        },
        (err: Error) => {
          throw err
        }
      )
    }
  }
}

/**
 * @param handler
 */
function proxyHistory(handler: (...arg: Array<any>) => void) {
  if (window.history) {
    const originPushState = history.pushState
    const originReplaceState = history.replaceState

    history.pushState = function (...args: Array<any>) {
      handler && handler(...args, 'pushState')
      originPushState.apply(window.history, args)
    }

    history.replaceState = function (...args: Array<any>) {
      handler && handler(...args, 'replaceState')
      originReplaceState.apply(window.history, args)
    }
  }
}

export { proxyXhr, proxyFetch, proxyHistory }
