import { Severity } from '../utils/Severity';
import { BREADCRUMBTYPES } from '../common';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: ReportDataType | string | Replace.IRouter | Replace.TriggerConsole;
    category?: string;
    time?: number;
    level: Severity;
}
