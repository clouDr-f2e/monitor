import { EVENTTYPES } from '../common/common';
import { TransportData } from '../core/transportData';
import { Breadcrumb } from '../core/breadcrumb';
import { Logger } from './logger';
import { Options } from '../core/options';
export interface MitoSupport {
    logger: Logger;
    breadcrumb: Breadcrumb;
    transportData: TransportData;
    replaceFlag: {
        [key in EVENTTYPES]?: boolean;
    };
    record?: any[];
    options?: Options;
}
interface MITOGlobal {
    console: Console;
    __MITO__: MitoSupport;
}
export declare function isNodeEnv(): boolean;
export declare function getGlobal<T>(): T & MITOGlobal;
declare const _global: Window & MITOGlobal;
declare const _support: MitoSupport;
export { _global, _support };
export declare function setFlag(replaceType: EVENTTYPES, isSet: boolean): void;
export declare function getFlag(replaceType: EVENTTYPES): boolean;
export declare function getGlobalMitoSupport(): MitoSupport;
