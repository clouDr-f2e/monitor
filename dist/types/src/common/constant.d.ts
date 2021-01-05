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
    PROMISE_ERROR = "PROMISE_ERROR"
}
export declare enum WxEvents {
    OnLaunch = "onLaunch",
    OnShow = "onShow",
    OnHide = "onHide",
    OnError = "onError",
    OnPageNotFound = "onPageNotFound",
    OnUnhandledRejection = "onUnhandledRejection",
    Console = "wxConsole"
}
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
    OnLaunch: WxEvents.OnLaunch;
    OnShow: WxEvents.OnShow;
    OnHide: WxEvents.OnHide;
    OnError: WxEvents.OnError;
    OnPageNotFound: WxEvents.OnPageNotFound;
    OnUnhandledRejection: WxEvents.OnUnhandledRejection;
    Console: WxEvents.Console;
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
    ON_SHOW = "On Show",
    ON_LAUNCH = "On Launch"
}
export declare enum BREADCRUMBCATEGORYS {
    HTTP = "http",
    USER = "user",
    DEBUG = "debug",
    EXCEPTION = "exception",
    LIFECYCLE = "lifecycle"
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
