import { InitOptions } from '@zyf2e/monitor-types'
import { isWxMiniEnv } from '@zyf2e/monitor-utils'
import { setupReplace } from './load'
import { initOptions, log } from '@zyf2e/monitor-core'
import { sendTrackData, track } from './initiative'
import { SDK_NAME, SDK_VERSION } from '@zyf2e/monitor-shared'
import { MitoVue } from '@zyf2e/monitor-vue'
import { errorBoundaryReport } from '@zyf2e/monitor-react'
export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
  Object.assign(wx, { mitoLog: log, SDK_NAME, SDK_VERSION })
}
export { log, sendTrackData, track, MitoVue, errorBoundaryReport }
