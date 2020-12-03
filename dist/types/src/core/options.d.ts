import { InitOptions } from '../types/options';
export declare class Options {
    beforeAppAjaxSend: Function;
    afterAppAjaxClose: Function;
    enableTraceId: Boolean;
    filterXhrUrlRegExp: RegExp;
    traceIdFieldName: string;
    constructor();
    bindOptions(options?: InitOptions): void;
}
declare const options: Options;
export { options };
