import initOptions from '@/initOpitons'
import { InitOptions } from '@/types/options'
import { isWxMiniEnv } from '@/utils'
import { setupReplace } from './load'

function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return
  initOptions(options)
  setupReplace()
}

export default { init }
