import { InitOptions } from '@mitojs/types'
import { isWxMiniEnv } from '@mitojs/utils'
import { setupReplace } from './load'
import { initOptions, log } from '@mitojs/core'
export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
  Object.assign(wx, { mitoLog: log })
}
