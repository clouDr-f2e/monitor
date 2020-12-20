import { Severity } from '../utils/Severity';
import { BREADCRUMBTYPES } from '../common';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
interface IRouteBreadcrumb {
    from: string;
    to: string;
}
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: ReportDataType | string | IRouteBreadcrumb | Replace.TriggerConsole;
    category?: string;
    time?: number;
    level: Severity;
}
export {};
