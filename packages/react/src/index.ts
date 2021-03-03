import { BREADCRUMBTYPES, ERRORTYPES } from '@mito/common'
import { isError, extractErrorStack, Severity } from '@mito/utils'
import { breadcrumb, transportData } from '@mito/core'
import { ReportDataType } from '@mito/types'

/**
 * 收集react ErrorBoundary中的错误对象
 * 需要用户手动在componentDidCatch中设置
 * @param ex ErrorBoundary中的componentDidCatch的一个参数error
 */
export function errorBoundaryReport(ex: any): void {
  if (!isError(ex)) {
    console.warn('传入的react error不是一个object Error')
    return
  }
  const error = extractErrorStack(ex, Severity.Normal) as ReportDataType
  error.type = ERRORTYPES.REACT_ERROR
  breadcrumb.push({
    type: BREADCRUMBTYPES.REACT,
    category: breadcrumb.getCategory(BREADCRUMBTYPES.REACT),
    data: `${error.name}: ${error.message}`,
    level: Severity.fromString(error.level)
  })
  transportData.send(error)
}
