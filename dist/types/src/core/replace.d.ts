import { EVENTTYPES, HTTPTYPE } from '../common';
export interface MITOHttp {
    type: HTTPTYPE;
    traceId?: string;
    method?: string;
    url?: string;
    status?: number;
    reqData?: any;
    sTime?: number;
    elapsedTime?: number;
    responseText?: any;
    time?: number;
    isSdkUrl?: boolean;
}
export interface MITOXMLHttpRequest extends XMLHttpRequest {
    [key: string]: any;
    mito_xhr?: MITOHttp;
}
interface ReplaceHandler {
    type: EVENTTYPES;
    callback: ReplaceCallback;
}
declare type ReplaceCallback = (data: any) => void;
export declare function addReplaceHandler(handler: ReplaceHandler): void;
export {};
