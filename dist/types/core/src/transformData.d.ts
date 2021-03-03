import { ReportDataType, MITOHttp, Replace, ResourceErrorTarget } from '@mito/types';
export declare function httpTransform(data: MITOHttp): ReportDataType;
export declare function resourceTransform(target: ResourceErrorTarget): ReportDataType;
export declare function handleConsole(data: Replace.TriggerConsole): void;
