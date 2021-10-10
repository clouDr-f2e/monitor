/**
 * @param beforeHandler
 * @param afterHandler
 */
function proxyXhr(beforeHandler: (...args: Array<any>) => void, afterHandler: (...args: Array<any>) => void): void {
  if ('XMLHttpRequest' in window) {
    const origin = window.XMLHttpRequest
    const originOpen = origin.prototype.open
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
  if ('fetch' in window) {
    const origin = window.fetch
    window.fetch = function (resource: string, init: Partial<Request>) {
      beforeHandler && beforeHandler(resource, init)
      return origin.call(window, resource, init).then((response: Response) => {
        afterHandler && afterHandler(resource, init)
        return response
      })
    }
  }
}

/**
 * @param handler
 */
function proxyHistory(handler) {
  if (window.history) {
    const originPushState = history.pushState
    const originReplaceState = history.replaceState

    history.pushState = function (...args: Array<any>) {
      handler && handler()
      originPushState.apply(window.history, args)
    }

    history.replaceState = function (...args: Array<any>) {
      handler && handler()
      originReplaceState.apply(window.history, args)
    }
  }
}

export { proxyXhr, proxyFetch, proxyHistory }
