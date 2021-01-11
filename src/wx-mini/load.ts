import { HandleEvents } from '@/browser/handleEvents'
import { EVENTTYPES, WxAppEvents, WxConsoleEvents } from '@/common/constant'
import { HandleWxConsoleEvents, HandleNetworkEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage, replaceRequest } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
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
