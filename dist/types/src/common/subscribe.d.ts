import { EVENTTYPES, WxEvents } from './constant';
export interface ReplaceHandler {
    type: EVENTTYPES | WxEvents;
    callback: ReplaceCallback;
}
declare type ReplaceCallback = (data: any) => void;
export declare function subscribeEvent(handler: ReplaceHandler): boolean;
export declare function triggerHandlers(type: EVENTTYPES | WxEvents, data: any): void;
export {};
