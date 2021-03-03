import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '@mito/shared';
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
declare const breadcrumb: Breadcrumb;
export { breadcrumb };
