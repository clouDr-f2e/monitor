/**
 * @param beforeHandler
 * @param afterHandler
 */
function proxyXhr(beforeHandler: (...args: Array<any>) => void, afterHandler: (...args: Array<any>) => void): void {
  const origin = window.XMLHttpRequest
  if (origin) {
    const originOpen = origin.prototype.open
    origin.prototype.open = function (this: XMLHttpRequest, ...args: Array<any>) {
      beforeHandler && beforeHandler(...args)
      originOpen.apply(this, args)
      this.addEventListener('loadend', () => {
        afterHandler && afterHandler(...args)
      })
    }
  }
}

/**
 * @param beforeHandler
 * @param afterHandler
 */
function proxyFetch(beforeHandler: (...args: Array<any>) => void, afterHandler: (...args: Array<any>) => void): void {
  const origin = window.fetch
  if (origin) {
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
      console.log('pushState')
      handler && handler()
      originPushState.apply(window.history, args)
    }

    history.replaceState = function (...args: Array<any>) {
      console.log('replaceState')
      handler && handler()
      originReplaceState.apply(window.history, args)
    }
  }
}

export { proxyXhr, proxyFetch, proxyHistory }
