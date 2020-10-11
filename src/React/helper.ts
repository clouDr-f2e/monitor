import { getLocationHref, getTimestamp } from 'utils'
import { ERRORTYPES, BREADCRUMBTYPES } from 'common'
import { breadcrumb, transportData } from 'core'
import { ReportDataType } from '../types/transportData'
import { Severity } from '../utils/Severity'

export function handleReactError(err: Error, info, stack: string, level: Severity, breadcrumbLevel: Severity): void {
  const data: ReportDataType = {
    type: ERRORTYPES.REACT_ERROR,
    message: err,
    level,
    url: getLocationHref(),
    componentName: info,
    propsData: info || '',
    name: err.name,
    stack,
    time: getTimestamp()
  }
  breadcrumb.push({
    type: BREADCRUMBTYPES.REACT,
    category: breadcrumb.getCategory(BREADCRUMBTYPES.REACT),
    data,
    level: breadcrumbLevel
  })
  transportData.xhrPost(data)
}
