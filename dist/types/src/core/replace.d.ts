import { HTTPTYPE } from '../common/common';
import { ReplaceHandler } from '../common/subscribe';
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
export declare function addReplaceHandler(handler: ReplaceHandler): void;
