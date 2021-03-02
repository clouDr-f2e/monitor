import { breadcrumb } from '@mito/core';
import { Severity } from '@mito/utils';
import { BREADCRUMBTYPES, globalVar } from './constant';
export function handleConsole(data) {
    if (globalVar.isLogAddBreadcrumb) {
        breadcrumb.push({
            type: BREADCRUMBTYPES.CONSOLE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
            data: data,
            level: Severity.fromString(data.level)
        });
    }
}
//# sourceMappingURL=handleEvents.js.map