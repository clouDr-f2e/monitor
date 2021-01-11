import { WxConsoleEvents } from '@/common/constant'
import { HandleWxConsoleEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage, replaceRequest } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
  replaceRequest()
  addReplaceHandler({
    callback: (data) => {
      HandleWxConsoleEvents.console(data)
    },
    type: WxConsoleEvents.Console
  })
}
