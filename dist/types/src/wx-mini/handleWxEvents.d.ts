/// <reference types="wechat-miniprogram" />
import { Replace } from '@/types/replace';
declare const HandleWxEvents: {
    onLaunch(options: WechatMiniprogram.App.LaunchShowOption): void;
    onShow(options: WechatMiniprogram.App.LaunchShowOption): void;
    onError(error: string): void;
    onUnhandledRejection(data: WechatMiniprogram.OnUnhandledRejectionCallbackResult): void;
    onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void;
    console(data: Replace.TriggerConsole): void;
};
export default HandleWxEvents;
