import { Breadcrumb } from '../core/breadcrumb';
import { BreadcrumbPushData } from './breadcrumb';
import { ReportDataType } from './transportData';
declare type CANCEL = null | undefined | boolean;
declare type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface IRequestHeaderConfig {
    url: TMethod;
    method: string;
}
declare type TSetRequestHeader = (key: string, value: string) => {};
export interface IBeforeAppAjaxSendConfig {
    setRequestHeader: TSetRequestHeader;
}
export interface InitOptions extends SilentEventTypes, HooksTypes {
    dsn?: string;
    disabled?: boolean;
    apikey?: string;
    debug?: boolean;
    enableTraceId?: boolean;
    traceIdFieldName?: string;
    filterHttpTraceIdRegExp?: RegExp;
    maxBreadcrumbs?: number;
    filterXhrUrlRegExp?: RegExp;
}
export interface HooksTypes {
    configReportXhr?(xhr: XMLHttpRequest): void;
    beforeDataReport?(event: ReportDataType): PromiseLike<ReportDataType | null> | ReportDataType | CANCEL;
    beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL;
    beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void;
    backTrackerId?(): string | number;
}
export interface SilentEventTypes {
    silentXhr?: boolean;
    silentFetch?: boolean;
    silentConsole?: boolean;
    silentDom?: boolean;
    silentHistory?: boolean;
    silentError?: boolean;
    silentUnhandledrejection?: boolean;
    silentHashchange?: boolean;
    silentVue?: boolean;
}
export {};
