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
