import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '../common/common';
import { BreadcrumbPushData } from '../types/breadcrumb';
import { InitOptions } from '../types/options';
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
    getCategory(type: BREADCRUMBTYPES): BREADCRUMBCATEGORYS;
    bindOptions(options?: InitOptions): void;
}
declare const breadcrumb: Breadcrumb;
export { breadcrumb };
