import { Queue } from '@mito/utils';
import { AuthInfo, TransportDataType, ReportDataType, InitOptions } from '@mito/types';
export declare class TransportData {
    url: string;
    queue: Queue;
    beforeDataReport: unknown;
    backTrackerId: InitOptions | unknown;
    configReportXhr: unknown;
    apikey: string;
    constructor(url: string);
    getRecord(): any[];
    beforePost(data: ReportDataType): Promise<string | false>;
    xhrPost(data: ReportDataType): Promise<void>;
    wxPost(data: ReportDataType): Promise<void>;
    getAuthInfo(): AuthInfo;
    getApikey(): string;
    getTrackerId(): string | number;
    getTransportData(data: ReportDataType): TransportDataType;
    isSdkTransportUrl(targetUrl: string): boolean;
    bindOptions(options?: InitOptions): void;
    send(data: ReportDataType): Promise<void>;
}
declare const transportData: TransportData;
export { transportData };
