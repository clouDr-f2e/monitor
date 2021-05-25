import { OnHiddenCallback } from '../types'

export const onHidden = (cb: OnHiddenCallback, once?: boolean) => {
  const onHiddenOrPageHide = (event: Event) => {
    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
      cb(event)
      if (once) {
        removeEventListener('visibilitychange', onHiddenOrPageHide, true)
        removeEventListener('pagehide', onHiddenOrPageHide, true)
      }
    }
  }
  addEventListener('visibilitychange', onHiddenOrPageHide, true)
  // Some browsers have buggy implementations of visibilitychange,
  // so we use pagehide in addition, just to be safe.
  addEventListener('pagehide', onHiddenOrPageHide, true)
}
