import { InitOptions } from '@mito/types'
import { isWxMiniEnv } from '@mito/utils'
import { setupReplace } from './load'
import { initOptions, log } from '@mito/core'
export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
  Object.assign(wx, { mitoLog: log })
}
