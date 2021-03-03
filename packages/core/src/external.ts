import { ERRORTYPES, BREADCRUMBTYPES } from '@mito/shared'
import { isError, extractErrorStack, getLocationHref, getTimestamp, unknownToString, isWxMiniEnv, Severity, getCurrentRoute } from '@mito/utils'
import { transportData } from './transportData'
import { breadcrumb } from './breadcrumb'
import { TNumStrObj } from '@mito/types'

interface LogTypes {
  message: TNumStrObj
  tag?: TNumStrObj
  level?: Severity
  ex?: Error | any
}

/**
 *
 * 自定义上报事件
 * @export
 * @param {LogTypes} { message = 'emptyMsg', tag = '', level = Severity.Critical, ex = '' }
 */
export function log({ message = 'emptyMsg', tag = '', level = Severity.Critical, ex = '' }: LogTypes): void {
  let errorInfo = {}
  if (isError(ex)) {
    errorInfo = extractErrorStack(ex, level)
  }
  const error = {
    type: ERRORTYPES.LOG_ERROR,
    level,
    message: unknownToString(message),
    name: 'MITO.log',
    customTag: unknownToString(tag),
    time: getTimestamp(),
    url: isWxMiniEnv ? getCurrentRoute() : getLocationHref(),
    ...errorInfo
  }
  breadcrumb.push({
    type: BREADCRUMBTYPES.CUSTOMER,
    category: breadcrumb.getCategory(BREADCRUMBTYPES.CUSTOMER),
    data: message,
    level: Severity.fromString(level.toString())
  })
  transportData.send(error)
}
