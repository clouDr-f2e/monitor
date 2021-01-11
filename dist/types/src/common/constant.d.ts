export declare type voidFun = () => void;
export declare enum ERRORTYPES {
    UNKNOWN = "UNKNOWN",
    UNKNOWN_FUNCTION = "UNKNOWN_FUNCTION",
    JAVASCRIPT_ERROR = "JAVASCRIPT_ERROR",
    BUSINESS_ERROR = "BUSINESS_ERROR",
    LOG_ERROR = "LOG_ERROR",
    FETCH_ERROR = "HTTP_ERROR",
    VUE_ERROR = "VUE_ERROR",
    REACT_ERROR = "REACT_ERROR",
    RESOURCE_ERROR = "RESOURCE_ERROR",
    PROMISE_ERROR = "PROMISE_ERROR",
    MINIPROGRAM_REQUEST_ERROR = "MINIPROGRAM_REQUEST_ERROR"
}
export declare enum WxAppEvents {
    AppOnLaunch = "AppOnLaunch",
    AppOnShow = "AppOnShow",
    AppOnHide = "AppOnHide",
    AppOnError = "AppOnError",
    AppOnPageNotFound = "AppOnPageNotFound",
    AppOnUnhandledRejection = "AppOnUnhandledRejection"
}
export declare enum WxPageEvents {
    PageOnShow = "PageOnShow",
    PageOnHide = "PageOnHide",
    PageOnShareAppMessage = "PageOnShareAppMessage",
    PageOnShareTimeline = "PageOnShareTimeline",
    PageOnTabItemTap = "PageOnTabItemTap"
}
export declare enum WxConsoleEvents {
    Console = "wxConsole"
}
export declare enum WxRouteEvents {
    SwitchTab = "switchTab",
    ReLaunch = "reLaunch",
    RedirectTo = "redirectTo",
    NavigateTo = "navigateTo",
    NavigateBack = "navigateBack"
}
export declare type WxEvents = WxAppEvents | WxPageEvents | WxConsoleEvents | WxRouteEvents;
export declare const CompositeEvents: {
    UNKNOWN: ERRORTYPES.UNKNOWN;
    UNKNOWN_FUNCTION: ERRORTYPES.UNKNOWN_FUNCTION;
    JAVASCRIPT_ERROR: ERRORTYPES.JAVASCRIPT_ERROR;
    BUSINESS_ERROR: ERRORTYPES.BUSINESS_ERROR;
    LOG_ERROR: ERRORTYPES.LOG_ERROR;
    FETCH_ERROR: ERRORTYPES.FETCH_ERROR;
    VUE_ERROR: ERRORTYPES.VUE_ERROR;
    REACT_ERROR: ERRORTYPES.REACT_ERROR;
    RESOURCE_ERROR: ERRORTYPES.RESOURCE_ERROR;
    PROMISE_ERROR: ERRORTYPES.PROMISE_ERROR;
    MINIPROGRAM_REQUEST_ERROR: ERRORTYPES.MINIPROGRAM_REQUEST_ERROR;
    Console: WxConsoleEvents.Console;
    PageOnShow: WxPageEvents.PageOnShow;
    PageOnHide: WxPageEvents.PageOnHide;
    PageOnShareAppMessage: WxPageEvents.PageOnShareAppMessage;
    PageOnShareTimeline: WxPageEvents.PageOnShareTimeline;
    PageOnTabItemTap: WxPageEvents.PageOnTabItemTap;
    AppOnLaunch: WxAppEvents.AppOnLaunch;
    AppOnShow: WxAppEvents.AppOnShow;
    AppOnHide: WxAppEvents.AppOnHide;
    AppOnError: WxAppEvents.AppOnError;
    AppOnPageNotFound: WxAppEvents.AppOnPageNotFound;
    AppOnUnhandledRejection: WxAppEvents.AppOnUnhandledRejection;
};
export declare type CompositeEvents = typeof CompositeEvents;
export declare enum BREADCRUMBTYPES {
    ROUTE = "Route",
    CLICK = "UI.Click",
    CONSOLE = "Console",
    XHR = "Xhr",
    FETCH = "Fetch",
    UNHANDLEDREJECTION = "Unhandledrejection",
    VUE = "Vue",
    REACT = "React",
    RESOURCE = "Resource",
    CODE_ERROR = "Code Error",
    CUSTOMER = "Customer",
    APP_ON_SHOW = "App On Show",
    APP_ON_LAUNCH = "App On Launch",
    APP_ON_HIDE = "App On Hide",
    PAGE_ON_SHOW = "Page On Show",
    PAGE_ON_HIDE = "Page On Hide",
    PAGE_ON_SHARE_APP_MESSAGE = "Page On Share App Message",
    PAGE_ON_SHARE_TIMELINE = "Page On Share Timeline",
    PAGE_ON_TAB_ITEM_TAP = "Page On Tab Item Tap",
    MINIPROGRAM_REQUEST = "Miniprogram Request"
}
export declare enum BREADCRUMBCATEGORYS {
    HTTP = "http",
    USER = "user",
    DEBUG = "debug",
    EXCEPTION = "exception",
    LIFECYCLE = "lifecycle",
    NETWORK = "network"
}
export declare enum EVENTTYPES {
    XHR = "xhr",
    FETCH = "fetch",
    CONSOLE = "console",
    DOM = "dom",
    HISTORY = "history",
    ERROR = "error",
    HASHCHANGE = "hashchange",
    UNHANDLEDREJECTION = "unhandledrejection",
    MITO = "mito",
    VUE = "Vue"
}
export declare enum HTTPTYPE {
    XHR = "xhr",
    FETCH = "fetch"
}
export declare enum HTTP_CODE {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_EXCEPTION = 500
}
export declare const ERROR_TYPE_RE: RegExp;
declare const globalVar: {
    isLogAddBreadcrumb: boolean;
    crossOriginThreshold: number;
};
export { globalVar };
