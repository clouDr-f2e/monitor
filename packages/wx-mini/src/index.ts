import { InitOptions } from '@mitojs/types'
import { isWxMiniEnv } from '@mitojs/utils'
import { setupReplace } from './load'
import { initOptions, log } from '@mitojs/core'
import { sendTrackData, track } from './initiative'
export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
  Object.assign(wx, { mitoLog: log })
}
// 重写 wx.navigateToMiniProgram 把query sessionId是否要带归去
export { log, sendTrackData, track }
