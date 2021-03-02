import { InitOptions } from '@mito/types';
export declare class Options {
    beforeAppAjaxSend: Function;
    afterAppAjaxClose: Function;
    enableTraceId: Boolean;
    filterXhrUrlRegExp: RegExp;
    includeHttpUrlTraceIdRegExp: RegExp;
    traceIdFieldName: string;
    constructor();
    bindOptions(options?: InitOptions): void;
}
declare const options: import("../dist").Options | Options;
export declare function setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void): void;
export { options };
//# sourceMappingURL=options.d.ts.map