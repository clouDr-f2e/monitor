import { getLocationHref, getTimestamp } from 'utils'
import { ERRORTYPES, BREADCRUMBTYPES } from '@/common'
// import { ViewModel } from './types'
import { breadcrumb, transportData } from 'core'
import { ReportDataType } from '@/types/transportData'
import { Severity } from '@/utils/Severity'

export function handleReactError(err: Error, vm, info: string, level: Severity, breadcrumbLevel: Severity): void {
  const propsData = Object.assign(vm.props, vm.state)
  const data: ReportDataType = {
    type: ERRORTYPES.REACT_ERROR,
    message: `${err.message}(${info})`,
    level,
    url: getLocationHref(),
    componentName: vm,
    propsData: propsData || '',
    name: err.name,
    stack: err.stack || [],
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
