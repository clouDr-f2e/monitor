import { ERRORLEVELS, ERRORTYPES } from '@/common'
import { isError, extractErrorStack, getLocationHref } from 'utils'
import { transportData } from './transportData'
import { breadcrumb } from './breadcrumb'
import { Severity } from '@/utils/Severity'

interface LogTypes {
  message: string
  level: ERRORLEVELS
  info: string
  ex: any
  type: ERRORTYPES
}
export function log({ info = 'emptyMsg', level = ERRORLEVELS.CRITICAL, ex = '', type = ERRORTYPES.BUSINESS_ERROR }: LogTypes): void {
  let errorInfo = {}
  if (isError(ex)) {
    errorInfo = extractErrorStack(ex, level)
  }
  const error = {
    ...errorInfo,
    type,
    info,
    level,
    url: getLocationHref()
  }
  breadcrumb.push({
    type: 'customer',
    data: info,
    level: Severity.fromString(level.toString())
  })
  transportData.xhrPost(error)
}
