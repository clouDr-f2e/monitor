/// <reference types="wechat-miniprogram" />
declare const HandleWxEvents: {
    onLaunch(options: WechatMiniprogram.App.LaunchShowOption): void;
    onShow(options: WechatMiniprogram.App.LaunchShowOption): void;
    onError(error: string): void;
    onUnhandledRejection(data: WechatMiniprogram.OnUnhandledRejectionCallbackResult): void;
    onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void;
};
export default HandleWxEvents;
