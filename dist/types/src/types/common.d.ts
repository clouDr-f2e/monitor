import { HTTPTYPE } from '../common/common';
export interface IStringObject {
    [key: string]: any;
}
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
