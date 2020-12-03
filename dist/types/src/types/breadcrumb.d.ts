import { Severity } from '../utils/Severity';
import { BREADCRUMBTYPES } from '../common';
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: any;
    category?: string;
    time?: number;
    level: Severity;
}
