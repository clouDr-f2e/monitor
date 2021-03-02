import { BREADCRUMBTYPES } from '@mito/common';
import { BreadcrumbPushData, InitOptions } from '@mito/types';
export declare class Breadcrumb {
    private maxBreadcrumbs;
    private beforePushBreadcrumb;
    private stack;
    constructor();
    push(data: BreadcrumbPushData): void;
    immediatePush(data: BreadcrumbPushData): void;
    shift(): boolean;
    clear(): void;
    getStack(): BreadcrumbPushData[];
    getCategory(type: BREADCRUMBTYPES): any;
    bindOptions(options?: InitOptions): void;
}
declare const breadcrumb: any;
export { breadcrumb };
//# sourceMappingURL=breadcrumb.d.ts.map