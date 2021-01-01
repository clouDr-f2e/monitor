import { EVENTTYPES } from './common';
export interface ReplaceHandler {
    type: EVENTTYPES;
    callback: ReplaceCallback;
}
declare type ReplaceCallback = (data: any) => void;
export declare function subscribeEvent(handler: ReplaceHandler): void;
export declare function triggerHandlers(type: EVENTTYPES, data: any): void;
export {};
