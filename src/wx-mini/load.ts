import { EVENTTYPES } from '@/common/constant'
import { HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents, HandleWxPageEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage, replaceComponent, replaceBehavior } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
  replaceComponent()
  replaceBehavior()
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
  addReplaceHandler({
    callback: (data) => HandleWxPageEvents.onAction(data),
    type: EVENTTYPES.DOM
  })
}
