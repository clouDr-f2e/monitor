'use strict';

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var ERRORTYPES;
(function (ERRORTYPES) {
    ERRORTYPES["UNKNOWN"] = "UNKNOWN";
    ERRORTYPES["UNKNOWN_FUNCTION"] = "UNKNOWN_FUNCTION";
    ERRORTYPES["JAVASCRIPT_ERROR"] = "JAVASCRIPT_ERROR";
    ERRORTYPES["LOG_ERROR"] = "LOG_ERROR";
    ERRORTYPES["FETCH_ERROR"] = "HTTP_ERROR";
    ERRORTYPES["VUE_ERROR"] = "VUE_ERROR";
    ERRORTYPES["REACT_ERROR"] = "REACT_ERROR";
    ERRORTYPES["RESOURCE_ERROR"] = "RESOURCE_ERROR";
    ERRORTYPES["PROMISE_ERROR"] = "PROMISE_ERROR";
    ERRORTYPES["MINIPROGRAM_REQUEST_ERROR"] = "MINIPROGRAM_REQUEST_ERROR";
})(ERRORTYPES || (ERRORTYPES = {}));
var WxAppEvents;
(function (WxAppEvents) {
    WxAppEvents["AppOnLaunch"] = "AppOnLaunch";
    WxAppEvents["AppOnShow"] = "AppOnShow";
    WxAppEvents["AppOnHide"] = "AppOnHide";
    WxAppEvents["AppOnError"] = "AppOnError";
    WxAppEvents["AppOnPageNotFound"] = "AppOnPageNotFound";
    WxAppEvents["AppOnUnhandledRejection"] = "AppOnUnhandledRejection";
})(WxAppEvents || (WxAppEvents = {}));
var WxPageEvents;
(function (WxPageEvents) {
    WxPageEvents["PageOnShow"] = "PageOnShow";
    WxPageEvents["PageOnHide"] = "PageOnHide";
    WxPageEvents["PageOnShareAppMessage"] = "PageOnShareAppMessage";
    WxPageEvents["PageOnShareTimeline"] = "PageOnShareTimeline";
    WxPageEvents["PageOnTabItemTap"] = "PageOnTabItemTap";
})(WxPageEvents || (WxPageEvents = {}));
var WxConsoleEvents;
(function (WxConsoleEvents) {
    WxConsoleEvents["Console"] = "wxConsole";
})(WxConsoleEvents || (WxConsoleEvents = {}));
var WxRouteEvents;
(function (WxRouteEvents) {
    WxRouteEvents["SwitchTab"] = "switchTab";
    WxRouteEvents["ReLaunch"] = "reLaunch";
    WxRouteEvents["RedirectTo"] = "redirectTo";
    WxRouteEvents["NavigateTo"] = "navigateTo";
    WxRouteEvents["NavigateBack"] = "navigateBack";
})(WxRouteEvents || (WxRouteEvents = {}));
var CompositeEvents = __assign(__assign(__assign(__assign({}, WxAppEvents), WxPageEvents), WxConsoleEvents), ERRORTYPES);
var BREADCRUMBTYPES;
(function (BREADCRUMBTYPES) {
    BREADCRUMBTYPES["ROUTE"] = "Route";
    BREADCRUMBTYPES["CLICK"] = "UI.Click";
    BREADCRUMBTYPES["CONSOLE"] = "Console";
    BREADCRUMBTYPES["XHR"] = "Xhr";
    BREADCRUMBTYPES["FETCH"] = "Fetch";
    BREADCRUMBTYPES["UNHANDLEDREJECTION"] = "Unhandledrejection";
    BREADCRUMBTYPES["VUE"] = "Vue";
    BREADCRUMBTYPES["REACT"] = "React";
    BREADCRUMBTYPES["RESOURCE"] = "Resource";
    BREADCRUMBTYPES["CODE_ERROR"] = "Code Error";
    BREADCRUMBTYPES["CUSTOMER"] = "Customer";
    BREADCRUMBTYPES["APP_ON_SHOW"] = "App On Show";
    BREADCRUMBTYPES["APP_ON_LAUNCH"] = "App On Launch";
    BREADCRUMBTYPES["APP_ON_HIDE"] = "App On Hide";
    BREADCRUMBTYPES["PAGE_ON_SHOW"] = "Page On Show";
    BREADCRUMBTYPES["PAGE_ON_HIDE"] = "Page On Hide";
    BREADCRUMBTYPES["PAGE_ON_SHARE_APP_MESSAGE"] = "Page On Share App Message";
    BREADCRUMBTYPES["PAGE_ON_SHARE_TIMELINE"] = "Page On Share Timeline";
    BREADCRUMBTYPES["PAGE_ON_TAB_ITEM_TAP"] = "Page On Tab Item Tap";
    BREADCRUMBTYPES["MINIPROGRAM_REQUEST"] = "Miniprogram Request";
})(BREADCRUMBTYPES || (BREADCRUMBTYPES = {}));
var BREADCRUMBCATEGORYS;
(function (BREADCRUMBCATEGORYS) {
    BREADCRUMBCATEGORYS["HTTP"] = "http";
    BREADCRUMBCATEGORYS["USER"] = "user";
    BREADCRUMBCATEGORYS["DEBUG"] = "debug";
    BREADCRUMBCATEGORYS["EXCEPTION"] = "exception";
    BREADCRUMBCATEGORYS["LIFECYCLE"] = "lifecycle";
    BREADCRUMBCATEGORYS["NETWORK"] = "network";
})(BREADCRUMBCATEGORYS || (BREADCRUMBCATEGORYS = {}));
var EVENTTYPES;
(function (EVENTTYPES) {
    EVENTTYPES["XHR"] = "xhr";
    EVENTTYPES["FETCH"] = "fetch";
    EVENTTYPES["CONSOLE"] = "console";
    EVENTTYPES["DOM"] = "dom";
    EVENTTYPES["HISTORY"] = "history";
    EVENTTYPES["ERROR"] = "error";
    EVENTTYPES["HASHCHANGE"] = "hashchange";
    EVENTTYPES["UNHANDLEDREJECTION"] = "unhandledrejection";
    EVENTTYPES["MITO"] = "mito";
    EVENTTYPES["VUE"] = "Vue";
})(EVENTTYPES || (EVENTTYPES = {}));
var HTTPTYPE;
(function (HTTPTYPE) {
    HTTPTYPE["XHR"] = "xhr";
    HTTPTYPE["FETCH"] = "fetch";
})(HTTPTYPE || (HTTPTYPE = {}));
var HTTP_CODE;
(function (HTTP_CODE) {
    HTTP_CODE[HTTP_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_CODE[HTTP_CODE["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_CODE[HTTP_CODE["INTERNAL_EXCEPTION"] = 500] = "INTERNAL_EXCEPTION";
})(HTTP_CODE || (HTTP_CODE = {}));
var ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
var globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
};

var nativeToString = Object.prototype.toString;
function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}
var variableTypeDetection = {
    isNumber: isType('Number'),
    isString: isType('String'),
    isBoolean: isType('Boolean'),
    isNull: isType('Null'),
    isUndefined: isType('Undefined'),
    isSymbol: isType('Symbol'),
    isFunction: isType('Function'),
    isObject: isType('Object'),
    isArray: isType('Array'),
    isProcess: isType('process'),
    isWindow: isType('Window')
};
function isError(wat) {
    switch (nativeToString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) && variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
function getGlobal() {
    if (isBrowserEnv)
        return window;
    if (isWxMiniEnv)
        return wx;
    if (isNodeEnv)
        return process;
}
var _global = getGlobal();
var _support = getGlobalMitoSupport();
_support.replaceFlag = _support.replaceFlag || {};
var replaceFlag = _support.replaceFlag;
function setFlag(replaceType, isSet) {
    if (replaceFlag[replaceType])
        return;
    replaceFlag[replaceType] = isSet;
}
function getFlag(replaceType) {
    return replaceFlag[replaceType] ? true : false;
}
function getGlobalMitoSupport() {
    _global.__MITO__ = _global.__MITO__ || {};
    return _global.__MITO__;
}

var PREFIX = 'MITO Logger';
var Logger = (function () {
    function Logger() {
        var _this = this;
        this.enabled = false;
        this._console = {};
        if (_global.console) {
            var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
            logType.forEach(function (level) {
                if (!(level in _global.console))
                    return;
                _this._console[level] = _global.console[level];
            });
        }
    }
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    Logger.prototype.bindOptions = function (debug) {
        this.enabled = debug ? true : false;
    };
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    Logger.prototype.getEnableStatus = function () {
        return this.enabled;
    };
    Logger.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).log.apply(_a, __spreadArrays([PREFIX + "[Log]:"], args));
    };
    Logger.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).warn.apply(_a, __spreadArrays([PREFIX + "[Warn]:"], args));
    };
    Logger.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).error.apply(_a, __spreadArrays([PREFIX + "[Error]:"], args));
    };
    return Logger;
}());
var logger = _support.logger || (_support.logger = new Logger());

function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
function replaceOld(source, name, replacement, isForced) {
    if (isForced === void 0) { isForced = false; }
    if (name in source || isForced) {
        var original = source[name];
        var wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[name] = wrapped;
        }
    }
}
var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
}
function getTimestamp() {
    return Date.now();
}
function typeofAny(target, type) {
    return typeof target === type;
}
function toStringAny(target, type) {
    return nativeToString.call(target) === type;
}
function validateOption(target, targetName, expectType) {
    if (typeofAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger.error(targetName + "\u671F\u671B\u4F20\u5165" + expectType + "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F" + typeof target + "\u7C7B\u578B");
    return false;
}
function toStringValidateOption(target, targetName, expectType) {
    if (toStringAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger.error(targetName + "\u671F\u671B\u4F20\u5165" + expectType + "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F" + nativeToString.call(target) + "\u7C7B\u578B");
    return false;
}
function slientConsoleScope(callback) {
    globalVar.isLogAddBreadcrumb = false;
    callback();
    globalVar.isLogAddBreadcrumb = true;
}
function unknownToString(target) {
    if (variableTypeDetection.isString(target)) {
        return target;
    }
    return JSON.stringify(target);
}
function isHttpFail(code) {
    return code === 0 || code === HTTP_CODE.BAD_REQUEST || code > HTTP_CODE.UNAUTHORIZED;
}

function parseUrlToObj(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment
    };
}
function setSilentFlag(opitons) {
    if (opitons === void 0) { opitons = {}; }
    setFlag(EVENTTYPES.XHR, !!opitons.silentXhr);
    setFlag(EVENTTYPES.FETCH, !!opitons.silentFetch);
    setFlag(EVENTTYPES.CONSOLE, !!opitons.silentConsole);
    setFlag(EVENTTYPES.DOM, !!opitons.silentDom);
    setFlag(EVENTTYPES.HISTORY, !!opitons.silentHistory);
    setFlag(EVENTTYPES.ERROR, !!opitons.silentError);
    setFlag(EVENTTYPES.HASHCHANGE, !!opitons.silentHashchange);
    setFlag(EVENTTYPES.UNHANDLEDREJECTION, !!opitons.silentUnhandledrejection);
    setFlag(EVENTTYPES.VUE, !!opitons.silentVue);
}
function extractErrorStack(ex, level) {
    var normal = {
        time: getTimestamp(),
        url: getLocationHref(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = ERRORTYPES.UNKNOWN_FUNCTION;
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}

function nativeTryCatch(fn, errorFn) {
    try {
        fn();
    }
    catch (err) {
        console.log('err', err);
        if (errorFn) {
            errorFn(err);
        }
    }
}

var Queue = (function () {
    function Queue() {
        this.stack = [];
        this.isFlushing = false;
        if (!('Promise' in _global))
            return;
        this.micro = Promise.resolve();
    }
    Queue.prototype.addFn = function (fn) {
        var _this = this;
        if (typeof fn !== 'function')
            return;
        if (!('Promise' in _global)) {
            fn();
            return;
        }
        this.stack.push(fn);
        if (!this.isFlushing) {
            this.isFlushing = true;
            this.micro.then(function () { return _this.flushStack(); });
        }
    };
    Queue.prototype.clear = function () {
        this.stack = [];
    };
    Queue.prototype.getStack = function () {
        return this.stack;
    };
    Queue.prototype.flushStack = function () {
        var temp = this.stack.slice(0);
        this.stack.length = 0;
        this.isFlushing = false;
        for (var i = 0; i < temp.length; i++) {
            temp[i]();
        }
    };
    return Queue;
}());

var Breadcrumb = (function () {
    function Breadcrumb() {
        this.maxBreadcrumbs = 10;
        this.beforePushBreadcrumb = null;
        this.stack = [];
    }
    Breadcrumb.prototype.push = function (data) {
        var _this = this;
        if (typeof this.beforePushBreadcrumb === 'function') {
            var result_1 = null;
            var beforePushBreadcrumb_1 = this.beforePushBreadcrumb;
            slientConsoleScope(function () {
                result_1 = beforePushBreadcrumb_1(_this, data);
            });
            if (!result_1)
                return;
            this.immediatePush(result_1);
            return;
        }
        this.immediatePush(data);
    };
    Breadcrumb.prototype.immediatePush = function (data) {
        data.time = getTimestamp();
        if (this.stack.length >= this.maxBreadcrumbs) {
            this.shift();
        }
        this.stack.push(data);
        logger.log(this.stack);
    };
    Breadcrumb.prototype.shift = function () {
        return this.stack.shift() !== undefined;
    };
    Breadcrumb.prototype.clear = function () {
        this.stack = [];
    };
    Breadcrumb.prototype.getStack = function () {
        return this.stack;
    };
    Breadcrumb.prototype.getCategory = function (type) {
        switch (type) {
            case BREADCRUMBTYPES.XHR:
            case BREADCRUMBTYPES.FETCH:
                return BREADCRUMBCATEGORYS.HTTP;
            case BREADCRUMBTYPES.CLICK:
            case BREADCRUMBTYPES.ROUTE:
                return BREADCRUMBCATEGORYS.USER;
            case BREADCRUMBTYPES.CUSTOMER:
            case BREADCRUMBTYPES.CONSOLE:
                return BREADCRUMBCATEGORYS.DEBUG;
            case BREADCRUMBTYPES.APP_ON_LAUNCH:
            case BREADCRUMBTYPES.APP_ON_SHOW:
            case BREADCRUMBTYPES.APP_ON_HIDE:
            case BREADCRUMBTYPES.PAGE_ON_SHOW:
            case BREADCRUMBTYPES.PAGE_ON_HIDE:
            case BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE:
            case BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE:
            case BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP:
                return BREADCRUMBCATEGORYS.LIFECYCLE;
            case BREADCRUMBTYPES.MINIPROGRAM_REQUEST:
                return BREADCRUMBCATEGORYS.NETWORK;
            case BREADCRUMBTYPES.UNHANDLEDREJECTION:
            case BREADCRUMBTYPES.CODE_ERROR:
            case BREADCRUMBTYPES.RESOURCE:
            case BREADCRUMBTYPES.VUE:
            case BREADCRUMBTYPES.REACT:
            default:
                return BREADCRUMBCATEGORYS.EXCEPTION;
        }
    };
    Breadcrumb.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var maxBreadcrumbs = options.maxBreadcrumbs, beforePushBreadcrumb = options.beforePushBreadcrumb;
        validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs);
        validateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'function') && (this.beforePushBreadcrumb = beforePushBreadcrumb);
    };
    return Breadcrumb;
}());
var breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb());

var allErrorNumber = {};
function createErrorId(data) {
    var id;
    var originUrl = getRealPageOrigin(data.url);
    switch (data.type) {
        case ERRORTYPES.FETCH_ERROR:
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + originUrl;
            break;
        case ERRORTYPES.JAVASCRIPT_ERROR:
        case ERRORTYPES.VUE_ERROR:
        case ERRORTYPES.REACT_ERROR:
            id = data.type + data.name + data.message + originUrl;
            break;
        case ERRORTYPES.LOG_ERROR:
            id = data.customTag + data.type + data.name + originUrl;
            break;
        case ERRORTYPES.PROMISE_ERROR:
            id = generatePromiseErrorId(data, originUrl);
            break;
        default:
            id = data.type + data.message + originUrl;
            break;
    }
    id = hashCode(id);
    if (allErrorNumber[id] > 1) {
        return null;
    }
    if (typeof allErrorNumber[id] === 'number') {
        allErrorNumber[id]++;
    }
    else {
        allErrorNumber[id] = 1;
    }
    return id;
}
function generatePromiseErrorId(data, originUrl) {
    var locationUrl = getRealPath(data.url);
    if (data.name === EVENTTYPES.UNHANDLEDREJECTION) {
        return data.type + objectOrder(data.message) + originUrl;
    }
    return data.type + data.name + objectOrder(data.message) + locationUrl;
}
function objectOrder(reason) {
    var sortFn = function (obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (total, key) {
            if (variableTypeDetection.isObject(obj[key])) {
                total[key] = sortFn(obj[key]);
            }
            else {
                total[key] = obj[key];
            }
            return total;
        }, {});
    };
    try {
        if (/\{.*\}/.test(reason)) {
            var obj = JSON.parse(reason);
            obj = sortFn(obj);
            return JSON.stringify(obj);
        }
    }
    catch (error) {
        return reason;
    }
}
function getRealPath(url) {
    return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
}
function getFlutterRealOrigin(url) {
    return removeHashPath(getFlutterRealPath(url));
}
function getFlutterRealPath(url) {
    return url.replace(/(\S+)(\/Documents\/)(\S*)/, "$3");
}
function getRealPageOrigin(url) {
    var fileStartReg = /^file:\/\//;
    if (fileStartReg.test(url)) {
        return getFlutterRealOrigin(url);
    }
    return getRealPath(removeHashPath(url).replace(/(\S*)(\/\/)(\S+)/, '$3'));
}
function removeHashPath(url) {
    return url.replace(/(\S+)(\/#\/)(\S*)/, "$1");
}
function hashCode(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}

var name = "@zyf2e/mitojs";
var version = "1.2.2";

var SDK_NAME = name;
var SDK_VERSION = version;
var SERVER_URL = '//localhost:3000/api/error/upload';

var EMethods;
(function (EMethods) {
    EMethods["Get"] = "GET";
    EMethods["Post"] = "POST";
    EMethods["Put"] = "PUT";
    EMethods["Delete"] = "DELETE";
})(EMethods || (EMethods = {}));

var TransportData = (function () {
    function TransportData(url) {
        this.url = url;
        this.beforeDataReport = null;
        this.backTrackerId = null;
        this.configReportXhr = null;
        this.apikey = '';
        this.queue = new Queue();
    }
    TransportData.prototype.getRecord = function () {
        var recordData = _support.record;
        if (recordData && variableTypeDetection.isArray(recordData) && recordData.length > 2) {
            return recordData;
        }
        return [];
    };
    TransportData.prototype.beforePost = function (data) {
        if (typeof this.beforeDataReport === 'function') {
            data = this.beforeDataReport(data);
            if (!data)
                return false;
        }
        var errorId = createErrorId(data);
        if (!errorId)
            return false;
        data.errorId = errorId;
        return JSON.stringify(this.getTransportData(data));
    };
    TransportData.prototype.xhrPost = function (data) {
        var _this = this;
        var result = this.beforePost(data);
        if (!result)
            return;
        var requestFun = function () {
            var xhr = new XMLHttpRequest();
            xhr.open(EMethods.Post, _this.url);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.withCredentials = true;
            if (typeof _this.configReportXhr === 'function') {
                _this.configReportXhr(xhr);
            }
            xhr.send(result);
        };
        this.queue.addFn(requestFun);
    };
    TransportData.prototype.wxPost = function (data) {
        var _this = this;
        var result = this.beforePost(data);
        if (!result)
            return;
        var requestFun = function () {
            wx.request({
                method: 'POST',
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                url: _this.url,
                data: result
            });
        };
        this.queue.addFn(requestFun);
    };
    TransportData.prototype.getAuthInfo = function () {
        var trackerId = this.getTrackerId();
        return {
            trackerId: String(trackerId),
            sdkVersion: SDK_VERSION,
            sdkName: SDK_NAME,
            apikey: this.apikey
        };
    };
    TransportData.prototype.getTrackerId = function () {
        if (typeof this.backTrackerId === 'function') {
            var trackerId = this.backTrackerId();
            if (typeof trackerId === 'string' || typeof trackerId === 'number') {
                return trackerId;
            }
            else {
                logger.error("trackerId:" + trackerId + " \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 " + typeof trackerId);
            }
        }
        return '';
    };
    TransportData.prototype.getTransportData = function (data) {
        return {
            authInfo: this.getAuthInfo(),
            breadcrumb: breadcrumb.getStack(),
            data: data,
            record: this.getRecord()
        };
    };
    TransportData.prototype.isSdkTransportUrl = function (targetUrl) {
        return targetUrl.indexOf(this.url) !== -1;
    };
    TransportData.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var dsn = options.dsn, beforeDataReport = options.beforeDataReport, apikey = options.apikey, configReportXhr = options.configReportXhr, backTrackerId = options.backTrackerId;
        validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey);
        validateOption(dsn, 'dsn', 'string') && (this.url = dsn);
        validateOption(beforeDataReport, 'beforeDataReport', 'function') && (this.beforeDataReport = beforeDataReport);
        validateOption(configReportXhr, 'configReportXhr', 'function') && (this.configReportXhr = configReportXhr);
        validateOption(backTrackerId, 'backTrackerId', 'function') && (this.backTrackerId = backTrackerId);
    };
    TransportData.prototype.send = function (data) {
        if (isBrowserEnv) {
            return this.xhrPost(data);
        }
        if (isWxMiniEnv) {
            return this.wxPost(data);
        }
    };
    return TransportData;
}());
var transportData = _support.transportData || (_support.transportData = new TransportData(SERVER_URL));

var Options = (function () {
    function Options() {
        this.traceIdFieldName = 'Trace-Id';
        this.enableTraceId = false;
    }
    Options.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var beforeAppAjaxSend = options.beforeAppAjaxSend, enableTraceId = options.enableTraceId, filterXhrUrlRegExp = options.filterXhrUrlRegExp, traceIdFieldName = options.traceIdFieldName, includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp;
        validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend);
        validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId);
        validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName);
        toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
        toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', '[object RegExp]') &&
            (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp);
    };
    return Options;
}());
var options = _support.options || (_support.options = new Options());

function initOptions(options$1) {
    if (options$1 === void 0) { options$1 = {}; }
    setSilentFlag(options$1);
    breadcrumb.bindOptions(options$1);
    logger.bindOptions(options$1.debug);
    transportData.bindOptions(options$1);
    options.bindOptions(options$1);
}

var Severity;
(function (Severity) {
    Severity["Else"] = "else";
    Severity["Error"] = "error";
    Severity["Warning"] = "warning";
    Severity["Info"] = "info";
    Severity["Debug"] = "debug";
    Severity["Low"] = "low";
    Severity["Normal"] = "normal";
    Severity["High"] = "high";
    Severity["Critical"] = "critical";
})(Severity || (Severity = {}));
(function (Severity) {
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
            case 'log':
            case 'assert':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case Severity.Low:
            case Severity.Normal:
            case Severity.High:
            case Severity.Critical:
            case 'error':
                return Severity.Error;
            default:
                return Severity.Else;
        }
    }
    Severity.fromString = fromString;
})(Severity || (Severity = {}));

var SpanStatus;
(function (SpanStatus) {
    SpanStatus["Ok"] = "ok";
    SpanStatus["DeadlineExceeded"] = "deadline_exceeded";
    SpanStatus["Unauthenticated"] = "unauthenticated";
    SpanStatus["PermissionDenied"] = "permission_denied";
    SpanStatus["NotFound"] = "not_found";
    SpanStatus["ResourceExhausted"] = "resource_exhausted";
    SpanStatus["InvalidArgument"] = "invalid_argument";
    SpanStatus["Unimplemented"] = "unimplemented";
    SpanStatus["Unavailable"] = "unavailable";
    SpanStatus["InternalError"] = "internal_error";
    SpanStatus["UnknownError"] = "unknown_error";
    SpanStatus["Cancelled"] = "cancelled";
    SpanStatus["AlreadyExists"] = "already_exists";
    SpanStatus["FailedPrecondition"] = "failed_precondition";
    SpanStatus["Aborted"] = "aborted";
    SpanStatus["OutOfRange"] = "out_of_range";
    SpanStatus["DataLoss"] = "data_loss";
})(SpanStatus || (SpanStatus = {}));
function fromHttpStatus(httpStatus) {
    if (httpStatus < 400) {
        return SpanStatus.Ok;
    }
    if (httpStatus >= 400 && httpStatus < 500) {
        switch (httpStatus) {
            case 401:
                return SpanStatus.Unauthenticated;
            case 403:
                return SpanStatus.PermissionDenied;
            case 404:
                return SpanStatus.NotFound;
            case 409:
                return SpanStatus.AlreadyExists;
            case 413:
                return SpanStatus.FailedPrecondition;
            case 429:
                return SpanStatus.ResourceExhausted;
            default:
                return SpanStatus.InvalidArgument;
        }
    }
    if (httpStatus >= 500 && httpStatus < 600) {
        switch (httpStatus) {
            case 501:
                return SpanStatus.Unimplemented;
            case 503:
                return SpanStatus.Unavailable;
            case 504:
                return SpanStatus.DeadlineExceeded;
            default:
                return SpanStatus.InternalError;
        }
    }
    return SpanStatus.UnknownError;
}

function httpTransform(data) {
    var message = '';
    var elapsedTime = data.elapsedTime, time = data.time, method = data.method, traceId = data.traceId, type = data.type, status = data.status;
    if (status === 0) {
        message = elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时';
    }
    else {
        message = fromHttpStatus(status);
    }
    return {
        type: ERRORTYPES.FETCH_ERROR,
        url: getLocationHref(),
        time: time,
        elapsedTime: elapsedTime,
        level: Severity.Low,
        message: message,
        name: type + "--" + method,
        request: {
            httpType: type,
            traceId: traceId,
            method: method,
            url: data.url,
            data: data.reqData || ''
        },
        response: {
            status: status,
            data: data.responseText
        }
    };
}
var resourceMap = {
    img: '图片',
    script: 'js脚本'
};
function resourceTransform(target) {
    return {
        type: ERRORTYPES.RESOURCE_ERROR,
        url: getLocationHref(),
        message: '资源地址: ' + (target.src.slice(0, 100) || target.href.slice(0, 100)),
        level: Severity.Low,
        time: getTimestamp(),
        name: (resourceMap[target.localName] || target.localName) + "\u52A0\u8F7D\u5931\u8D25"
    };
}

function getCurrentRoute() {
    var pages = getCurrentPages();
    return pages.length ? getCurrentPages().pop().route : 'App';
}
function extractErrorStack$1(ex, level) {
    var normal = {
        time: getTimestamp(),
        url: getCurrentRoute(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = ERRORTYPES.UNKNOWN_FUNCTION;
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}

var HandleEvents = {
    handleHttp: function (data, type) {
        var isError = data.status === 0 || data.status === HTTP_CODE.BAD_REQUEST || data.status > HTTP_CODE.UNAUTHORIZED;
        var result = httpTransform(data);
        breadcrumb.push({
            type: type,
            category: breadcrumb.getCategory(type),
            data: result,
            level: Severity.Info
        });
        if (isError) {
            breadcrumb.push({
                type: type,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: result,
                level: Severity.Error
            });
            transportData.send(result);
        }
    },
    handleError: function (errorEvent) {
        var target = errorEvent.target;
        if (target.localName) {
            var data = resourceTransform(errorEvent.target);
            breadcrumb.push({
                type: BREADCRUMBTYPES.RESOURCE,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.RESOURCE),
                data: data,
                level: Severity.Error
            });
            return transportData.send(data);
        }
        var message = errorEvent.message, filename = errorEvent.filename, lineno = errorEvent.lineno, colno = errorEvent.colno, error = errorEvent.error;
        var result;
        if (error && isError(error)) {
            result = extractErrorStack(error, Severity.Normal);
        }
        result || (result = HandleEvents.handleNotErrorInstance(message, filename, lineno, colno));
        result.type = ERRORTYPES.JAVASCRIPT_ERROR;
        breadcrumb.push({
            type: BREADCRUMBTYPES.CODE_ERROR,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
            data: result,
            level: Severity.Error
        });
        transportData.send(result);
    },
    handleNotErrorInstance: function (message, filename, lineno, colno) {
        var name = ERRORTYPES.UNKNOWN;
        var url = filename || getLocationHref();
        var msg = message;
        var matches = message.match(ERROR_TYPE_RE);
        if (matches[1]) {
            name = matches[1];
            msg = matches[2];
        }
        var element = {
            url: url,
            func: ERRORTYPES.UNKNOWN_FUNCTION,
            args: ERRORTYPES.UNKNOWN,
            line: lineno,
            col: colno
        };
        return {
            url: url,
            name: name,
            message: msg,
            level: Severity.Normal,
            time: getTimestamp(),
            stack: [element]
        };
    },
    handleHistory: function (data) {
        var from = data.from, to = data.to;
        var parsedFrom = parseUrlToObj(from).relative;
        var parsedTo = parseUrlToObj(to).relative;
        breadcrumb.push({
            type: BREADCRUMBTYPES.ROUTE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            data: {
                from: parsedFrom ? parsedFrom : '/',
                to: parsedTo ? parsedTo : '/'
            },
            level: Severity.Info
        });
    },
    handleHashchange: function (data) {
        var oldURL = data.oldURL, newURL = data.newURL;
        var from = parseUrlToObj(oldURL).relative;
        var to = parseUrlToObj(newURL).relative;
        breadcrumb.push({
            type: BREADCRUMBTYPES.ROUTE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            data: {
                from: from,
                to: to
            },
            level: Severity.Info
        });
    },
    handleUnhandleRejection: function (ev) {
        var data = {
            type: ERRORTYPES.PROMISE_ERROR,
            message: unknownToString(ev.reason),
            url: getLocationHref(),
            name: ev.type,
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(ev.reason)) {
            data = __assign(__assign({}, data), extractErrorStack(ev.reason, Severity.Low));
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: data,
            level: Severity.Error
        });
        transportData.send(data);
    },
    handleConsole: function (data) {
        if (globalVar.isLogAddBreadcrumb) {
            breadcrumb.push({
                type: BREADCRUMBTYPES.CONSOLE,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
                data: data,
                level: Severity.fromString(data.level)
            });
        }
    }
};

var HandleWxAppEvents = {
    onLaunch: function (options) {
        var data = {
            path: options.path,
            query: options.query
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_LAUNCH),
            type: BREADCRUMBTYPES.APP_ON_LAUNCH,
            data: data,
            level: Severity.Info
        });
    },
    onShow: function (options) {
        var data = {
            path: options.path,
            query: options.query
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_SHOW),
            type: BREADCRUMBTYPES.APP_ON_SHOW,
            data: data,
            level: Severity.Info
        });
    },
    onHide: function () {
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_HIDE),
            type: BREADCRUMBTYPES.APP_ON_HIDE,
            data: null,
            level: Severity.Info
        });
    },
    onError: function (error) {
        console.log(extractErrorStack$1(error, Severity.Error));
        var data = {
            stack: [],
            message: '',
            name: '',
            time: getTimestamp(),
            level: Severity.Normal,
            url: getCurrentRoute()
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
            type: BREADCRUMBTYPES.CODE_ERROR,
            level: Severity.Error,
            data: data
        });
        transportData.send(data);
    },
    onUnhandledRejection: function (ev) {
        var data = {
            type: ERRORTYPES.PROMISE_ERROR,
            message: unknownToString(ev.reason),
            url: getCurrentRoute(),
            name: 'unhandledrejection',
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(ev.reason)) {
            data = __assign(__assign({}, data), extractErrorStack$1(ev.reason, Severity.Low));
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: data,
            level: Severity.Error
        });
        transportData.send(data);
    },
    onPageNotFound: function (data) {
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            type: BREADCRUMBTYPES.ROUTE,
            data: data,
            level: Severity.Error
        });
    }
};
var HandleWxPageEvents = {
    onShow: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHOW),
            type: BREADCRUMBTYPES.PAGE_ON_SHOW,
            data: data,
            level: Severity.Info
        });
    },
    onHide: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_HIDE),
            type: BREADCRUMBTYPES.PAGE_ON_HIDE,
            data: data,
            level: Severity.Info
        });
    },
    onShareAppMessage: function (options) {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options,
            options: options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE),
            type: BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE,
            data: data,
            level: Severity.Info
        });
    },
    onShareTimeline: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE),
            type: BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE,
            data: data,
            level: Severity.Info
        });
    },
    onTabItemTap: function (options) {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options,
            options: options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP),
            type: BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP,
            data: data,
            level: Severity.Info
        });
    }
};
var HandleWxConsoleEvents = {
    console: function (data) {
        HandleEvents.handleConsole(data);
    }
};
var HandleNetworkEvents = {
    handleRequest: function (data) {
        var result = httpTransform(data);
        result.url = getCurrentRoute();
        if (data.status === undefined) {
            result.message = data.errMsg;
        }
        var type = BREADCRUMBTYPES.XHR;
        breadcrumb.push({
            type: type,
            category: breadcrumb.getCategory(type),
            data: result,
            level: Severity.Info
        });
        if (isHttpFail) {
            breadcrumb.push({
                type: type,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: result,
                level: Severity.Error
            });
            transportData.send(result);
        }
    }
};

var handlers = {};
function subscribeEvent(handler) {
    if (!handler) {
        return;
    }
    if (getFlag(handler.type))
        return;
    setFlag(handler.type, true);
    handlers[handler.type] = handlers[handler.type] || [];
    handlers[handler.type].push(handler.callback);
}
function triggerHandlers(type, data) {
    if (!type || !handlers[type])
        return;
    handlers[type].forEach(function (callback) {
        nativeTryCatch(function () {
            callback(data);
        }, function (e) {
            logger.error("\u91CD\u5199\u4E8B\u4EF6triggerHandlers\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\nType:" + type + "\nName: " + getFunctionName(callback) + "\nError: " + e);
        });
    });
}

function isFilterHttpUrl(url) {
    return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url);
}
function replace(type) {
    switch (type) {
        case WxConsoleEvents.Console:
            replaceConsole();
            break;
        case EVENTTYPES.XHR:
            replaceRequest();
            break;
    }
}
function addReplaceHandler(handler) {
    subscribeEvent(handler);
    replace(handler.type);
}
function replaceApp() {
    if (App) {
        var originApp_1 = App;
        App = function (appOptions) {
            var methods = [
                WxAppEvents.AppOnLaunch,
                WxAppEvents.AppOnShow,
                WxAppEvents.AppOnError,
                WxAppEvents.AppOnUnhandledRejection,
                WxAppEvents.AppOnPageNotFound,
                WxAppEvents.AppOnHide
            ];
            methods.forEach(function (method) {
                addReplaceHandler({
                    callback: function (data) { return HandleWxAppEvents[method.replace('AppOn', 'on')](data); },
                    type: method
                });
                replaceOld(appOptions, method.replace('AppOn', 'on'), function (originMethod) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        triggerHandlers.apply(null, __spreadArrays([method], args));
                        if (originMethod) {
                            originMethod.apply(this, args);
                        }
                    };
                }, true);
            });
            return originApp_1(appOptions);
        };
    }
}
function replacePage() {
    if (!Page) {
        return;
    }
    var originPage = Page;
    Page = function (appOptions) {
        var methods = [
            WxPageEvents.PageOnShow,
            WxPageEvents.PageOnHide,
            WxPageEvents.PageOnShareAppMessage,
            WxPageEvents.PageOnShareTimeline,
            WxPageEvents.PageOnTabItemTap
        ];
        methods.forEach(function (method) {
            addReplaceHandler({
                callback: function (data) { return HandleWxPageEvents[method.replace('PageOn', 'on')](data); },
                type: method
            });
            replaceOld(appOptions, method.replace('PageOn', 'on'), function (originMethod) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    triggerHandlers.apply(null, __spreadArrays([method], args));
                    if (originMethod) {
                        originMethod.apply(this, args);
                    }
                };
            }, true);
        });
        return originPage(appOptions);
    };
}
function replaceConsole() {
    if (console && variableTypeDetection.isObject(console)) {
        var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
        logType.forEach(function (level) {
            if (!(level in console))
                return;
            replaceOld(console, level, function (originalConsole) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (originalConsole) {
                        triggerHandlers(WxConsoleEvents.Console, { args: args, level: level });
                        originalConsole.apply(console, args);
                    }
                };
            });
        });
    }
}
function replaceRequest() {
    var originRequest = wx.request;
    Object.defineProperty(wx, 'request', {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var options = args[0];
            var url = options.url;
            if ((options.method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) {
                return originRequest.call(this, options);
            }
            var data = {
                type: HTTPTYPE.XHR,
                method: options.method,
                url: url,
                reqData: options.data,
                sTime: getTimestamp()
            };
            var successHandler = function (res) {
                var endTime = getTimestamp();
                data.responseText = typeof res.data === ('string' ) && res.data;
                data.elapsedTime = endTime - data.sTime;
                data.status = res.statusCode;
                data.errMsg = res.errMsg;
                if (typeof options.success === 'function') {
                    return options.success(res);
                }
                triggerHandlers(EVENTTYPES.XHR, data);
            };
            var failHandler = function (err) {
                var endTime = getTimestamp();
                data.elapsedTime = endTime - data.sTime;
                data.errMsg = err.errMsg;
                triggerHandlers(EVENTTYPES.XHR, data);
                if (typeof options.fail === 'function') {
                    return options.fail(err);
                }
            };
            var actOptions = __assign(__assign({}, options), { success: successHandler, fail: failHandler });
            return originRequest.call(this, actOptions);
        }
    });
}

function setupReplace() {
    replaceApp();
    replacePage();
    addReplaceHandler({
        callback: function (data) {
            HandleNetworkEvents.handleRequest(data);
        },
        type: EVENTTYPES.XHR
    });
    addReplaceHandler({
        callback: function (data) {
            HandleWxConsoleEvents.console(data);
        },
        type: WxConsoleEvents.Console
    });
}

function init(options) {
    if (options === void 0) { options = {}; }
    if (!isWxMiniEnv)
        return;
    initOptions(options);
    setupReplace();
}
var index = { init: init };

module.exports = index;
