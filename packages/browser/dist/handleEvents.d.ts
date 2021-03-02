import { BREADCRUMBTYPES, ERRORTYPES } from '@mito/common';
import { Replace, MITOHttp } from '@mito/types';
export interface ResourceErrorTarget {
    src?: string;
    href?: string;
    localName?: string;
}
declare const HandleEvents: {
    handleHttp(data: MITOHttp, type: BREADCRUMBTYPES): void;
    handleError(errorEvent: ErrorEvent): any;
    handleNotErrorInstance(message: string, filename: string, lineno: number, colno: number): {
        url: any;
        name: string;
        message: string;
        level: any;
        time: any;
        stack: {
            url: any;
            func: ERRORTYPES;
            args: ERRORTYPES;
            line: number;
            col: number;
        }[];
    };
    handleHistory(data: Replace.IRouter): void;
    handleHashchange(data: HashChangeEvent): void;
    handleUnhandleRejection(ev: PromiseRejectionEvent): void;
    handleConsole(data: Replace.TriggerConsole): void;
};
export { HandleEvents };
//# sourceMappingURL=handleEvents.d.ts.map