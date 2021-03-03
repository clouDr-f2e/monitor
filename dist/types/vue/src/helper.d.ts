import { Severity } from '@mito/utils';
import { ViewModel, VueInstance } from './types';
export declare function handleVueError(err: Error, vm: ViewModel, info: string, level: Severity, breadcrumbLevel: Severity, Vue: VueInstance): void;
