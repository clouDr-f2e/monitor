import { InitOptions } from '@mitojs/types'
import { isWxMiniEnv } from '@mitojs/utils'
import { setupReplace } from './load'
import { initOptions, log } from '@mitojs/core'
import { sendTrackData, track } from './initiative'
import { SDK_NAME, SDK_VERSION } from '@mitojs/shared'
import { MitoVue } from '@mitojs/vue'
import { errorBoundaryReport } from '@mitojs/react'
export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
  Object.assign(wx, { mitoLog: log, SDK_NAME, SDK_VERSION })
}
export { log, sendTrackData, track, MitoVue, errorBoundaryReport }
