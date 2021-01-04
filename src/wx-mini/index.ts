import { isWxMiniEnv } from '@/utils'
import { setupReplace } from './load'

function init() {
  if (!isWxMiniEnv) return
  setupReplace()
}

export default { init }
