import { ViewModel } from './types';
import { Severity } from '../utils/Severity';
export declare function handleVueError(err: Error, vm: ViewModel, info: string, level: Severity, breadcrumbLevel: Severity): void;
