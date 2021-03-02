/// <reference types="wechat-miniprogram" />
import { Replace, MITOHttp } from '@mito/types';
import { MiniRoute } from './types';
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
    onAction(e: WechatMiniprogram.BaseEvent): void;
};
declare const HandleWxConsoleEvents: {
    console(data: Replace.TriggerConsole): void;
};
declare const HandleNetworkEvents: {
    handleRequest(data: MITOHttp): void;
};
declare const HandleWxEvents: {
    handleRoute(data: MiniRoute): any;
};
export { HandleWxAppEvents, HandleWxPageEvents, HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents };
//# sourceMappingURL=handleWxEvents.d.ts.map