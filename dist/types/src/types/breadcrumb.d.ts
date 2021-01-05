import { Severity } from '../utils/Severity';
import { BREADCRUMBTYPES } from '../common/constant';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
import { IAnyObject } from './common';
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: ReportDataType | string | Replace.IRouter | Replace.TriggerConsole | WxLifeCycleBreadcrumb;
    category?: string;
    time?: number;
    level: Severity;
}
export interface WxLifeCycleBreadcrumb {
    path: string;
    query: IAnyObject;
}
