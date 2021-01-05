import { WxEvents } from '@/common/constant'
import HandleWxEvents from './handleWxEvents'
import { addReplaceHandler, replaceApp } from './replace'

export function setupReplace() {
  replaceApp()
  addReplaceHandler({
    callback: (data) => {
      HandleWxEvents.console(data)
    },
    type: WxEvents.Console
  })
}
