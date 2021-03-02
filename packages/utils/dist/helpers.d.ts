import { IAnyObject, IntegrationError } from '@mito/types';
export declare function getLocationHref(): string;
declare type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap;
export declare function on(target: {
    addEventListener: Function;
}, eventName: TotalEventName, handler: Function, opitons?: boolean | unknown): void;
export declare function replaceOld(source: IAnyObject, name: string, replacement: (...args: any[]) => any, isForced?: boolean): void;
export declare const defaultFunctionName = "<anonymous>";
export declare function getFunctionName(fn: unknown): string;
export declare const throttle: (fn: Function, delay: number) => Function;
export declare function getTimestamp(): number;
export declare function typeofAny(target: any, type: string): boolean;
export declare function toStringAny(target: any, type: string): boolean;
export declare function validateOption(target: any, targetName: string, expectType: string): boolean;
export declare function toStringValidateOption(target: any, targetName: string, expectType: string): boolean;
export declare function slientConsoleScope(callback: Function): void;
export declare function generateUUID(): string;
export declare function unknownToString(target: unknown): string;
export declare function getBigVersion(version: string): number;
export declare function isHttpFail(code: number): boolean;
export declare function setUrlQuery(url: string, query: object): string;
export declare function parseErrorString(str: string): IntegrationError;
export {};
//# sourceMappingURL=helpers.d.ts.map