import { HandleEvents } from './handleEvents'
import { htmlElementAsString, Severity } from '@mito/utils'
import { EVENTTYPES, BREADCRUMBTYPES } from '@mito/shared'
import { breadcrumb, handleConsole } from '@mito/core'
import { addReplaceHandler } from './replace'
export function setupReplace(): void {
  addReplaceHandler({
    callback: (data) => {
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
      handleConsole(data)
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
    callback: (data) => {
      const htmlString = htmlElementAsString(data.data.activeElement as HTMLElement)
      if (htmlString) {
        breadcrumb.push({
          type: BREADCRUMBTYPES.CLICK,
          category: breadcrumb.getCategory(BREADCRUMBTYPES.CLICK),
          data: htmlString,
          level: Severity.Info
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
