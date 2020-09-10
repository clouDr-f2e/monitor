import { ERRORTYPES, BREADCRUMBTYPES } from '@/common'
import { isError, extractErrorStack, getLocationHref } from 'utils'
import { transportData } from './transportData'
import { breadcrumb } from './breadcrumb'
import { Severity } from '@/utils/Severity'

interface LogTypes {
  message: string
  level: Severity
  info: string
  ex: any
  tag: string
  type: ERRORTYPES
}

/**
 * 自定义上报事件
 */
export function log({ info = 'emptyMsg', tag = '', level = Severity.Critical, ex = '', type = ERRORTYPES.BUSINESS_ERROR }: LogTypes): void {
  let errorInfo = {}
  if (isError(ex)) {
    errorInfo = extractErrorStack(ex, level)
  }
  const error = {
    ...errorInfo,
    type,
    customInfo: info,
    level,
    custmerTag: tag,
    url: getLocationHref()
  }
  breadcrumb.push({
    type: BREADCRUMBTYPES.CUSTOMER,
    data: info,
    level: Severity.fromString(level.toString())
  })
  transportData.send(error)
}
