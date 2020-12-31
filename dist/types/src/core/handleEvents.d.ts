import { BREADCRUMBTYPES, ERRORTYPES } from '../common/common';
import { Severity } from '../utils/Severity';
import { Replace } from '../types/replace';
import { MITOHttp } from '../types/common';
export interface ResourceErrorTarget {
    src?: string;
    href?: string;
    localName?: string;
}
declare const HandleEvents: {
    handleHttp(data: MITOHttp, type: BREADCRUMBTYPES): void;
    handleError(errorEvent: ErrorEvent): void;
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
    handleConsole(data: Replace.TriggerConsole): void;
};
export { HandleEvents };
