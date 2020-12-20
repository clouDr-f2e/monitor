import { BREADCRUMBTYPES, ERRORTYPES } from '../common'
import { isError, extractErrorStack } from 'utils'
import { Severity } from '../utils/Severity'
import { breadcrumb, transportData } from 'core'
import { ReportDataType } from 'types/index'

/**
 * 收集react ErrorBoundary中的错误对象
 * 需要用户手动在componentDidCatch中设置
 * @param ex ErrorBoundary中的componentDidCatch的一个参数error
 */
export function errorBoundaryReport(ex: any): void {
  if (isError(ex)) {
    const error = extractErrorStack(ex, Severity.Normal) as ReportDataType
    error.type = ERRORTYPES.REACT_ERROR
    breadcrumb.push({
      type: BREADCRUMBTYPES.REACT,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.REACT),
      data: error.message,
      level: Severity.fromString(error.level)
    })
    transportData.send(error)
  }
  console.log('传入的react error不是一个object Error')
}
