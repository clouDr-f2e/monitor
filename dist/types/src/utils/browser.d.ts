import { ReportDataType, InitOptions } from '../types/index';
import { Severity } from './Severity';
export declare function htmlElementAsString(target: HTMLElement): string;
export declare function parseUrlToObj(url: string): {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};
export declare function setSilentFlag(opitons?: InitOptions): void;
export declare function extractErrorStack(ex: any, level: Severity): ReportDataType;
