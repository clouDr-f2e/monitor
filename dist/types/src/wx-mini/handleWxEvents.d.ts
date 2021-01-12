/// <reference types="wechat-miniprogram" />
import { Replace } from '@/types/replace';
import { MITOHttp } from '@/types/common';
declare const HandleWxAppEvents: {
    onLaunch(options: WechatMiniprogram.App.LaunchShowOption): void;
    onShow(options: WechatMiniprogram.App.LaunchShowOption): void;
    onHide(): void;
    onError(error: string): void;
    onUnhandledRejection(ev: WechatMiniprogram.OnUnhandledRejectionCallbackResult): void;
    onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void;
};
declare const HandleWxPageEvents: {
    onShow(): void;
    onHide(): void;
    onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption): void;
    onShareTimeline(): void;
    onTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption): void;
};
declare const HandleWxConsoleEvents: {
    console(data: Replace.TriggerConsole): void;
};
declare const HandleNetworkEvents: {
    handleRequest(data: MITOHttp): void;
};
declare const HandleWxRouteEvents: {};
export { HandleWxAppEvents, HandleWxPageEvents, HandleWxConsoleEvents, HandleNetworkEvents, HandleWxRouteEvents };
