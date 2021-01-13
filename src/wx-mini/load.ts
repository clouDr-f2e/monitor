import { EVENTTYPES, WxConsoleEvents } from '@/common/constant'
import { HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage, replaceRoute } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
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
    type: WxConsoleEvents.Console
  })
}
