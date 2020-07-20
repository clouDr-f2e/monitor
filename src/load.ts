import { addReplaceHandler, MITOHttp, breadcrumb, BreadcrumbPushData, HandleEvents } from 'core'
import { htmlElementAsString, setSilentFlag } from 'utils'
import { SilentEventTypes } from '@/options'
import { EVENTTYPES, BREADCRUMBTYPES } from '@/common'
export function setupReplace(slientOptions: SilentEventTypes = {}): void {
  setSilentFlag(slientOptions)
  addReplaceHandler({
    callback: (data: MITOHttp) => {
      HandleEvents.handleHttp(data, BREADCRUMBTYPES.XHR)
    },
    type: EVENTTYPES.XHR
  })
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleHttp(data, BREADCRUMBTYPES.FETCH)
    },
    type: EVENTTYPES.FETCH
  })
  addReplaceHandler({
    callback: (error) => {
      HandleEvents.handleError(error)
    },
    type: EVENTTYPES.ERROR
  })
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleConsole(data)
    },
    type: EVENTTYPES.CONSOLE
  })
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleHistory(data)
    },
    type: EVENTTYPES.HISTORY
  })

  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleUnhandleRejection(data)
    },
    type: EVENTTYPES.UNHANDLEDREJECTION
  })
  addReplaceHandler({
    callback: (data: BreadcrumbPushData) => {
      const htmlString = htmlElementAsString(data.data.activeElement as HTMLElement)
      if (htmlString) {
        breadcrumb.push({
          type: BREADCRUMBTYPES.CLICK,
          data: htmlString
        })
      }
    },
    type: EVENTTYPES.DOM
  })
  addReplaceHandler({
    callback: (e: HashChangeEvent) => {
      HandleEvents.handleHashchange(e)
    },
    type: EVENTTYPES.HASHCHANGE
  })
}
