import { breadcrumb } from '@mito/core'
import { Replace } from '@mito/types'
import { Severity } from '@mito/utils'
import { BREADCRUMBTYPES, globalVar } from './constant'

export function handleConsole(data: Replace.TriggerConsole): void {
  if (globalVar.isLogAddBreadcrumb) {
    breadcrumb.push({
      type: BREADCRUMBTYPES.CONSOLE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
      data,
      level: Severity.fromString(data.level)
    })
  }
}
