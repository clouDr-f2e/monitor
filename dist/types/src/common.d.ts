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
    CUSTOMER = "Customer"
}
export declare enum BREADCRUMBCATEGORYS {
    HTTP = "http",
    USER = "user",
    DEBUG = "debug",
    EXCEPTION = "exception"
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
