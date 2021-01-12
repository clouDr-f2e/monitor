import { HandleEvents } from '@/browser/handleEvents'
import { EVENTTYPES, WxAppEvents, WxConsoleEvents } from '@/common/constant'
import { HandleWxConsoleEvents, HandleNetworkEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage, replaceRoute } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
  replaceRoute()
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
