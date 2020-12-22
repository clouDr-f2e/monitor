import { MitoVue } from '../Vue/index';
import { SDK_VERSION, SDK_NAME } from '../config';
import { InitOptions, ReportDataType } from '../types/index';
import { errorBoundaryReport } from 'React/index';
declare function init(options?: InitOptions): void;
declare function log(...args: any[]): void;
interface IManualInitOption {
    customTag: string;
    apikey: string;
}
declare type TCallBack = (param: IManualInitOption) => void;
declare function manualInit(callback: TCallBack, qa?: boolean): void;
declare function beforePushBreadcrumb(breadcrumb: any, cruBreadcrumbData: any): any;
declare function beforeAppAjaxSend({ method, url }: {
    method: any;
    url: any;
}, config: any): void;
declare function beforeDataReport(data: ReportDataType, customTag: string): false | ReportDataType;
export { MitoVue, SDK_VERSION, SDK_NAME, init, log, beforeAppAjaxSend, errorBoundaryReport, beforePushBreadcrumb, manualInit, beforeDataReport };
