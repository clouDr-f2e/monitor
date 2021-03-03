/// <reference types="wechat-miniprogram" />
import { EVENTTYPES, WxEvents } from '@mito/shared';
import { Breadcrumb, TransportData, Options } from '@mito/core';
import { Logger } from './logger';
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
    console?: Console;
    __MITO__?: MitoSupport;
}
export declare const isNodeEnv: boolean;
export declare const isWxMiniEnv: boolean;
export declare const isBrowserEnv: boolean;
export declare function getGlobal<T>(): MITOGlobal & T;
declare const _global: MITOGlobal & Window & WechatMiniprogram.Wx;
declare const _support: MitoSupport;
export { _global, _support };
export declare function setFlag(replaceType: EVENTTYPES | WxEvents, isSet: boolean): void;
export declare function getFlag(replaceType: EVENTTYPES | WxEvents): boolean;
export declare function getGlobalMitoSupport(): MitoSupport;
export declare function supportsHistory(): boolean;
