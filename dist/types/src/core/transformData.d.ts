import { MITOHttp } from './replace';
import { ResourceErrorTarget } from './handleEvents';
import { ReportDataType } from '../types/transportData';
export declare function httpTransform(data: MITOHttp): ReportDataType;
export declare function resourceTransform(target: ResourceErrorTarget): ReportDataType;
