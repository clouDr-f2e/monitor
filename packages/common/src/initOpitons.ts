import { breadcrumb, transportData, options as coreOptions } from '@mito/core'
import { InitOptions } from '@mito/types'
import { setSilentFlag, logger } from '@mito/utils'

export function initOptions(options: InitOptions = {}) {
  setSilentFlag(options)
  breadcrumb.bindOptions(options)
  logger.bindOptions(options.debug)
  transportData.bindOptions(options)
  coreOptions.bindOptions(options)
}
