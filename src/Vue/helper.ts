import { getLocationHref, getTimestamp } from 'utils'
import { ERRORTYPES, BREADCRUMBTYPES } from '@/common'
import { ViewModel } from './types'
import { breadcrumb, transportData } from 'core'
import { ReportDataType } from '@/types/transportData'
function formatComponentName(vm: ViewModel) {
  if (vm.$root === vm) return 'root'
  const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
  )
}

export function handleVueError(err: Error, vm: ViewModel, info: string, level: number): void {
  // let errInfo: { name: string; message: string; stack?: any[] } = {
  //   name: '',
  //   message: ''
  // }
  const componentName = formatComponentName(vm)
  const propsData = vm.$options && vm.$options.propsData
  const data: ReportDataType = {
    type: ERRORTYPES.VUE_ERROR,
    message: `${err.message}(${info})`,
    level,
    url: getLocationHref(),
    componentName: componentName,
    propsData: propsData || '',
    name: err.name,
    stack: err.stack || [],
    time: getTimestamp()
  }
  breadcrumb.push({
    type: BREADCRUMBTYPES.VUE,
    data
  })
  transportData.xhrPost(data)
}
