import { InitOptions } from '../types/index';
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
declare const _default: {
    MitoVue: {
        install(Vue: import("../Vue/types").VueInstance): void;
    };
    SDK_VERSION: string;
    SDK_NAME: string;
    init: typeof init;
    log: typeof log;
    beforeAppAjaxSend: typeof beforeAppAjaxSend;
    errorBoundaryReport: typeof errorBoundaryReport;
    beforePushBreadcrumb: typeof beforePushBreadcrumb;
    manualInit: typeof manualInit;
};
export default _default;
