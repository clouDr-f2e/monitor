import { BREADCRUMBTYPES, ERRORTYPES } from '@mito/common';
import { Severity } from '@mito/utils';
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
        url: string;
        name: string;
        message: string;
        level: Severity;
        time: number;
        stack: {
            url: string;
            func: ERRORTYPES;
            args: ERRORTYPES;
            line: number;
            col: number;
        }[];
    };
    handleHistory(data: Replace.IRouter): void;
    handleHashchange(data: HashChangeEvent): void;
    handleUnhandleRejection(ev: PromiseRejectionEvent): void;
};
export { HandleEvents };
//# sourceMappingURL=handleEvents.d.ts.map