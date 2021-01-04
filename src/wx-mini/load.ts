import { WxEvents } from '@/common/common'
import HandleWxEvents from './handleWxEvents'
import { addReplaceHandler, replaceApp } from './replace'

export function setupReplace() {
  replaceApp()
  addReplaceHandler({
    callback: (data) => {
      HandleWxEvents.onUnhandledRejection(data)
    },
    type: WxEvents.OnUnhandledRejection
  })
}
