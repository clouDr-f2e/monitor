import { ResourceErrorTarget } from '../browser/handleEvents';
import { ReportDataType } from '../types/transportData';
import { MITOHttp } from '../types/common';
export declare function httpTransform(data: MITOHttp): ReportDataType;
export declare function resourceTransform(target: ResourceErrorTarget): ReportDataType;
