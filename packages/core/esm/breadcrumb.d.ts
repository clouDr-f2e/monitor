import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '@mito/common';
import { BreadcrumbPushData, InitOptions } from '@mito/types';
export declare class Breadcrumb {
    maxBreadcrumbs: number;
    beforePushBreadcrumb: unknown;
    stack: BreadcrumbPushData[];
    constructor();
    push(data: BreadcrumbPushData): void;
    immediatePush(data: BreadcrumbPushData): void;
    shift(): boolean;
    clear(): void;
    getStack(): BreadcrumbPushData[];
    getCategory(type: BREADCRUMBTYPES): BREADCRUMBCATEGORYS;
    bindOptions(options?: InitOptions): void;
}
declare const breadcrumb: any;
export { breadcrumb };
//# sourceMappingURL=breadcrumb.d.ts.map