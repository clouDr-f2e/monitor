import { getLocationHref, getTimestamp } from 'utils'
import { ERRORTYPES, BREADCRUMBTYPES } from '@/common'
// import { ViewModel } from './types'
import { breadcrumb, transportData } from 'core'
import { ReportDataType } from '@/types/transportData'
import { Severity } from '@/utils/Severity'

function formatComponent(vm) {}

export function handleReactError(err: Error, vm, info: string, level: Severity, breadcrumbLevel: Severity): void {}
