import { EVENTTYPES } from '@/common/constant'
import { HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage, replaceComponent } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
  replaceComponent()
  addReplaceHandler({
    callback: (data) => HandleWxEvents.handleRoute(data),
    type: EVENTTYPES.MINI_ROUTE
  })
  addReplaceHandler({
    callback: (data) => {
      HandleNetworkEvents.handleRequest(data)
    },
    type: EVENTTYPES.XHR
  })
  addReplaceHandler({
    callback: (data) => {
      HandleWxConsoleEvents.console(data)
    },
    type: EVENTTYPES.CONSOLE
  })
}
