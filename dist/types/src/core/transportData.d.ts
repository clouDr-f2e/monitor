import { Queue } from '../utils/index';
import { InitOptions } from '../types/options';
import { AuthInfo, TransportDataType, ReportDataType } from '../types/transportData';
export declare class TransportData {
    url: string;
    queue: Queue;
    private beforeDataReport;
    private backTrackerId;
    private configReportXhr;
    private apikey;
    constructor(url: string);
    getRecord(): any[];
    beforePost(data: ReportDataType): string | false;
    xhrPost(data: ReportDataType): void;
    wxPost(data: ReportDataType): void;
    getAuthInfo(): AuthInfo;
    getTrackerId(): string | number;
    getTransportData(data: ReportDataType): TransportDataType;
    isSdkTransportUrl(targetUrl: string): boolean;
    bindOptions(options?: InitOptions): void;
    send(data: ReportDataType): void;
}
declare const transportData: TransportData;
export { transportData };
