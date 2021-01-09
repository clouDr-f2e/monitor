import { WxConsoleEvents } from '@/common/constant'
import { HandleWxConsoleEvents } from './handleWxEvents'
import { addReplaceHandler, replaceApp, replacePage } from './replace'

export function setupReplace() {
  replaceApp()
  replacePage()
  addReplaceHandler({
    callback: (data) => {
      HandleWxConsoleEvents.console(data)
    },
    type: WxConsoleEvents.Console
  })
}
