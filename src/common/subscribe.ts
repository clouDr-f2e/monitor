import { EVENTTYPES, WxEvents } from './common'
import { getFlag, getFunctionName, logger, nativeTryCatch, setFlag } from '../utils'
export interface ReplaceHandler {
  type: EVENTTYPES | WxEvents
  callback: ReplaceCallback
}

type ReplaceCallback = (data: any) => void

const handlers: { [key in EVENTTYPES]?: ReplaceCallback[] } = {}

export function subscribeEvent(handler: ReplaceHandler): void {
  if (!handler) {
    return
  }
  if (getFlag(handler.type)) return
  setFlag(handler.type, true)
  handlers[handler.type] = handlers[handler.type] || []
  handlers[handler.type].push(handler.callback)
}

export function triggerHandlers(type: EVENTTYPES | WxEvents, data: any): void {
  if (!type || !handlers[type]) return
  handlers[type].forEach((callback) => {
    nativeTryCatch(
      () => {
        callback(data)
      },
      (e: Error) => {
        logger.error(`重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName: ${getFunctionName(callback)}\nError: ${e}`)
      }
    )
  })
}
