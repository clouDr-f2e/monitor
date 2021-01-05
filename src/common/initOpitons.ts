import { breadcrumb } from '../core/breadcrumb'
import { transportData } from '../core/transportData'
import { InitOptions } from '../types/options'
import { setSilentFlag } from '../utils/browser'
import { logger } from '../utils/logger'
import { options as coreOptions } from '../core/options'

export default function initOptions(options: InitOptions = {}) {
  setSilentFlag(options)
  breadcrumb.bindOptions(options)
  logger.bindOptions(options.debug)
  transportData.bindOptions(options)
  coreOptions.bindOptions(options)
}
