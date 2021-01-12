import { ReportDataType } from '../types/index';
import { Severity } from '../utils/Severity';
export declare function getCurrentRoute(): string;
export declare function extractErrorStack(ex: any, level: Severity): ReportDataType;
