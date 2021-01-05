import { ERRORTYPES } from '../common/constant';
import { BreadcrumbPushData } from './breadcrumb';
export interface AuthInfo {
    apikey: string;
    sdkVersion: string;
    sdkName: string;
    trackerId: string;
}
export interface TransportDataType {
    authInfo: AuthInfo;
    breadcrumb: BreadcrumbPushData[];
    data: ReportDataType;
    record?: any[];
}
export interface ReportDataType {
    type?: ERRORTYPES;
    message?: string;
    url: string;
    name?: string;
    stack?: any;
    time?: number;
    errorId?: number;
    level: string;
    elapsedTime?: number;
    request?: {
        httpType?: string;
        traceId?: string;
        method: string;
        url: string;
        data: any;
    };
    response?: {
        status: number;
        data: string;
    };
    componentName?: string;
    propsData?: any;
    customTag?: string;
}
