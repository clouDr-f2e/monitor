/* @mitojs/wx-mini version ' + 2.1.3 */
import { variableTypeDetection, setUrlQuery, Severity, getCurrentRoute, isHttpFail, parseErrorString, getTimestamp, unknownToString, isError, extractErrorStack, _support, getFlag, replaceOld, isEmptyObject, throttle, generateUUID, getLocationHref, getBigVersion, setFlag, slientConsoleScope, isWxMiniEnv } from '@mitojs/utils';
import { BREADCRUMBTYPES, ERRORTYPES, WxPageEvents, WxAppEvents, EVENTTYPES, HTTPTYPE, WxRouteEvents, SDK_NAME, SDK_VERSION } from '@mitojs/shared';
import { options, breadcrumb, handleConsole, httpTransform, transportData, subscribeEvent, triggerHandlers, setTraceId, initOptions, log } from '@mitojs/core';
export { log } from '@mitojs/core';
import { EMethods } from '@mitojs/types';

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
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function getNavigateBackTargetUrl(delta) {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    delta = delta || 1;
    var toPage = pages[pages.length - delta];
    return setUrlQuery(toPage.route, toPage.options);
}
function targetAsString(e) {
    var _a, _b;
    var id = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.id) ? " id=\"" + ((_b = e.currentTarget) === null || _b === void 0 ? void 0 : _b.id) + "\"" : '';
    var dataSets = Object.keys(e.currentTarget.dataset).map(function (key) {
        return "data-" + key + "=" + e.currentTarget.dataset[key];
    });
    return "<element " + id + " " + dataSets.join(' ') + "/>";
}
function getWxMiniDeviceInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, pixelRatio, screenHeight, screenWidth, netType;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = wx.getSystemInfoSync(), pixelRatio = _a.pixelRatio, screenHeight = _a.screenHeight, screenWidth = _a.screenWidth;
                    return [4, getWxMiniNetWrokType()];
                case 1:
                    netType = _b.sent();
                    return [2, {
                            ratio: pixelRatio,
                            clientHeight: screenHeight,
                            clientWidth: screenWidth,
                            netType: netType
                        }];
            }
        });
    });
}
function getWxMiniNetWrokType() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    wx.getNetworkType({
                        success: function (res) {
                            resolve(res.networkType);
                        },
                        fail: function (err) {
                            console.error("\u83B7\u53D6\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7F51\u7EDC\u7C7B\u578B\u5931\u8D25:" + err);
                            resolve('getNetWrokType failed');
                        }
                    });
                })];
        });
    });
}

var ELinstenerTypes;
(function (ELinstenerTypes) {
    ELinstenerTypes["Touchmove"] = "touchmove";
    ELinstenerTypes["Tap"] = "tap";
    ELinstenerTypes["Longtap"] = "longtap";
    ELinstenerTypes["Longpress"] = "longpress";
})(ELinstenerTypes || (ELinstenerTypes = {}));

var HandleWxAppEvents = {
    onLaunch: function (options$1) {
        options.appOnLaunch(options$1);
        var data = {
            path: options$1.path,
            query: options$1.query
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_LAUNCH),
            type: BREADCRUMBTYPES.APP_ON_LAUNCH,
            data: data,
            level: Severity.Info
        });
    },
    onShow: function (options$1) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = _support;
                        return [4, getWxMiniDeviceInfo()];
                    case 1:
                        _a.deviceInfo = _b.sent();
                        options.appOnShow(options$1);
                        data = {
                            path: options$1.path,
                            query: options$1.query
                        };
                        breadcrumb.push({
                            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_SHOW),
                            type: BREADCRUMBTYPES.APP_ON_SHOW,
                            data: data,
                            level: Severity.Info
                        });
                        return [2];
                }
            });
        });
    },
    onHide: function () {
        options.appOnHide();
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_HIDE),
            type: BREADCRUMBTYPES.APP_ON_HIDE,
            data: null,
            level: Severity.Info
        });
    },
    onError: function (error) {
        var parsedError = parseErrorString(error);
        var data = __assign(__assign({}, parsedError), { time: getTimestamp(), level: Severity.Normal, url: getCurrentRoute(), type: ERRORTYPES.JAVASCRIPT_ERROR });
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
            type: BREADCRUMBTYPES.CODE_ERROR,
            level: Severity.Error,
            data: __assign({}, data)
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
            data = __assign(__assign(__assign({}, data), extractErrorStack(ev.reason, Severity.Low)), { url: getCurrentRoute() });
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: __assign({}, data),
            level: Severity.Error
        });
        transportData.send(data);
    },
    onPageNotFound: function (data) {
        options.onPageNotFound(data);
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
        options.pageOnShow(page);
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
        options.pageOnHide(page);
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
    onShareAppMessage: function (options$1) {
        var page = getCurrentPages().pop();
        options.onShareAppMessage(__assign(__assign({}, page), options$1));
        var data = {
            path: page.route,
            query: page.options,
            options: options$1
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
        options.onShareTimeline(page);
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
    onTabItemTap: function (options$1) {
        var page = getCurrentPages().pop();
        options.onTabItemTap(__assign(__assign({}, page), options$1));
        var data = {
            path: page.route,
            query: page.options,
            options: options$1
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP),
            type: BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP,
            data: data,
            level: Severity.Info
        });
    },
    onAction: function (e) {
        options.triggerWxEvent(e);
        var type = BREADCRUMBTYPES.TOUCHMOVE;
        if (e.type === ELinstenerTypes.Tap) {
            type = BREADCRUMBTYPES.TAP;
        }
        breadcrumb.push({
            category: breadcrumb.getCategory(type),
            type: type,
            data: targetAsString(e),
            level: Severity.Info
        });
    }
};
var HandleWxConsoleEvents = {
    console: function (data) {
        handleConsole(data);
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
        if (isHttpFail(data.status)) {
            breadcrumb.push({
                type: type,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: __assign({}, result),
                level: Severity.Error
            });
            transportData.send(result);
        }
    }
};
var HandleWxEvents = {
    handleRoute: function (data) {
        if (data.isFail) {
            breadcrumb.push({
                type: BREADCRUMBTYPES.ROUTE,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: data,
                level: Severity.Error
            });
            var reportData = {
                type: ERRORTYPES.ROUTE_ERROR,
                message: data.message,
                url: data.to,
                name: 'MINI_' + ERRORTYPES.ROUTE_ERROR,
                level: Severity.Error
            };
            return transportData.send(reportData);
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.ROUTE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            data: data,
            level: Severity.Info
        });
    }
};

function isFilterHttpUrl(url) {
    return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url);
}
function replace(type) {
    switch (type) {
        case EVENTTYPES.CONSOLE:
            replaceConsole();
            break;
        case EVENTTYPES.XHR:
            replaceNetwork();
            break;
        case EVENTTYPES.MINI_ROUTE:
            replaceRoute();
    }
}
function addReplaceHandler(handler) {
    if (!subscribeEvent(handler))
        return;
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
                if (getFlag(method))
                    return;
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
                        if (originMethod) {
                            originMethod.apply(this, args);
                        }
                        triggerHandlers.apply(null, __spreadArrays([method], args));
                    };
                }, true);
            });
            return originApp_1(appOptions);
        };
    }
}
var pageLifeMethods = [
    WxPageEvents.PageOnShow,
    WxPageEvents.PageOnHide,
    WxPageEvents.PageOnShareAppMessage,
    WxPageEvents.PageOnShareTimeline,
    WxPageEvents.PageOnTabItemTap
];
function replacePageLifeMethods(options) {
    pageLifeMethods.forEach(function (method) {
        replaceOld(options, method.replace('PageOn', 'on'), function (originMethod) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                triggerHandlers.apply(null, __spreadArrays([method], args));
                if (originMethod) {
                    return originMethod.apply(this, args);
                }
            };
        }, true);
    });
}
function replacePage() {
    if (!Page) {
        return;
    }
    var originPage = Page;
    pageLifeMethods.forEach(function (method) {
        if (getFlag(method))
            return;
        addReplaceHandler({
            callback: function (data) { return HandleWxPageEvents[method.replace('PageOn', 'on')](data); },
            type: method
        });
    });
    Page = function (pageOptions) {
        replacePageLifeMethods(pageOptions);
        replaceAction(pageOptions);
        return originPage.call(this, pageOptions);
    };
}
function replaceComponent() {
    if (!Component) {
        return;
    }
    var originComponent = Component;
    Component = function (componentOptions) {
        if (!isEmptyObject(componentOptions.methods)) {
            replacePageLifeMethods(componentOptions.methods);
            replaceAction(componentOptions.methods);
        }
        return originComponent.call(this, componentOptions);
    };
}
function replaceBehavior() {
    if (!Behavior) {
        return;
    }
    var originBehavior = Behavior;
    Behavior = function (behaviorOptions) {
        if (!isEmptyObject(behaviorOptions.methods)) {
            replaceAction(behaviorOptions.methods);
        }
        return originBehavior.call(this, behaviorOptions);
    };
}
function replaceAction(options) {
    function gestureTrigger(e) {
        e.mitoWorked = true;
        triggerHandlers(EVENTTYPES.DOM, e);
    }
    var throttleGesturetrigger = throttle(gestureTrigger, 500);
    var linstenerTypes = [ELinstenerTypes.Touchmove, ELinstenerTypes.Tap];
    if (options) {
        Object.keys(options).forEach(function (m) {
            if ('function' !== typeof options[m]) {
                return;
            }
            replaceOld(options, m, function (originMethod) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var e = args[0];
                    if (e && e.type && e.currentTarget && !e.mitoWorked) {
                        if (linstenerTypes.indexOf(e.type) > -1) {
                            throttleGesturetrigger(e);
                        }
                    }
                    return originMethod.apply(this, args);
                };
            }, true);
        });
    }
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
                        triggerHandlers(EVENTTYPES.CONSOLE, { args: args, level: level });
                        originalConsole.apply(console, args);
                    }
                };
            });
        });
    }
}
function replaceNetwork() {
    var hookMethods = ['request', 'downloadFile', 'uploadFile'];
    hookMethods.forEach(function (hook) {
        var originRequest = wx[hook];
        Object.defineProperty(wx, hook, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var options$1 = args[0];
                var method;
                if (options$1.method) {
                    method = options$1.method;
                }
                else if (hook === 'downloadFile') {
                    method = EMethods.Get;
                }
                else {
                    method = EMethods.Post;
                }
                var url = options$1.url;
                var header = options$1.header;
                !header || (header = {});
                if ((method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) {
                    return originRequest.call(this, options$1);
                }
                var reqData;
                if (hook === 'request') {
                    reqData = options$1.data;
                }
                else if (hook === 'downloadFile') {
                    reqData = {
                        filePath: options$1.filePath
                    };
                }
                else {
                    reqData = {
                        filePath: options$1.filePath,
                        name: options$1.name
                    };
                }
                var data = {
                    type: HTTPTYPE.XHR,
                    method: method,
                    url: url,
                    reqData: reqData,
                    sTime: getTimestamp()
                };
                setTraceId(url, function (headerFieldName, traceId) {
                    data.traceId = traceId;
                    header[headerFieldName] = traceId;
                });
                function setRequestHeader(key, value) {
                    header[key] = value;
                }
                options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, { setRequestHeader: setRequestHeader });
                var successHandler = function (res) {
                    var endTime = getTimestamp();
                    data.responseText = (variableTypeDetection.isString(res.data) || variableTypeDetection.isObject(res.data)) && res.data;
                    data.elapsedTime = endTime - data.sTime;
                    data.status = res.statusCode;
                    data.errMsg = res.errMsg;
                    data.time = endTime;
                    triggerHandlers(EVENTTYPES.XHR, data);
                    if (typeof options$1.success === 'function') {
                        return options$1.success(res);
                    }
                };
                var _fail = options$1.fail;
                var failHandler = function (err) {
                    var endTime = getTimestamp();
                    data.elapsedTime = endTime - data.sTime;
                    data.errMsg = err.errMsg;
                    triggerHandlers(EVENTTYPES.XHR, data);
                    if (variableTypeDetection.isFunction(_fail)) {
                        return _fail(err);
                    }
                };
                var actOptions = __assign(__assign({}, options$1), { success: successHandler, fail: failHandler });
                return originRequest.call(this, actOptions);
            }
        });
    });
}
function replaceRoute() {
    var methods = [
        WxRouteEvents.SwitchTab,
        WxRouteEvents.ReLaunch,
        WxRouteEvents.RedirectTo,
        WxRouteEvents.NavigateTo,
        WxRouteEvents.NavigateBack,
        WxRouteEvents.NavigateToMiniProgram
    ];
    methods.forEach(function (method) {
        var originMethod = wx[method];
        Object.defineProperty(wx, method, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function (options$1) {
                var _a;
                var toUrl;
                if (method === WxRouteEvents.NavigateBack) {
                    toUrl = getNavigateBackTargetUrl((_a = options$1) === null || _a === void 0 ? void 0 : _a.delta);
                }
                else {
                    toUrl = options$1.url;
                }
                var data = {
                    from: getCurrentRoute(),
                    to: toUrl
                };
                triggerHandlers(EVENTTYPES.MINI_ROUTE, data);
                if (variableTypeDetection.isFunction(options$1.complete) ||
                    variableTypeDetection.isFunction(options$1.success) ||
                    variableTypeDetection.isFunction(options$1.fail)) {
                    var _fail_1 = options$1.fail;
                    var failHandler = function (res) {
                        var failData = __assign(__assign({}, data), { isFail: true, message: res.errMsg });
                        triggerHandlers(EVENTTYPES.MINI_ROUTE, failData);
                        if (variableTypeDetection.isFunction(_fail_1)) {
                            return _fail_1(res);
                        }
                    };
                    options$1.fail = failHandler;
                }
                if (method === WxRouteEvents.NavigateToMiniProgram && variableTypeDetection.isFunction(options.wxNavigateToMiniProgram)) {
                    options$1 = options.wxNavigateToMiniProgram(options$1);
                }
                return originMethod.call(this, options$1);
            }
        });
    });
}

function setupReplace() {
    replaceApp();
    replacePage();
    replaceComponent();
    replaceBehavior();
    addReplaceHandler({
        callback: function (data) { return HandleWxEvents.handleRoute(data); },
        type: EVENTTYPES.MINI_ROUTE
    });
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
        type: EVENTTYPES.CONSOLE
    });
    addReplaceHandler({
        callback: function (data) { return HandleWxPageEvents.onAction(data); },
        type: EVENTTYPES.DOM
    });
}

function track(actionType, param) {
    var data = __assign(__assign({}, param), { actionType: actionType });
    sendTrackData(data);
    return data;
}
function sendTrackData(data) {
    var id = generateUUID();
    var trackTime = getTimestamp();
    transportData.send(__assign({ id: id,
        trackTime: trackTime }, data));
}

function handleVueError(err, vm, info, level, breadcrumbLevel, Vue) {
    var version = Vue === null || Vue === void 0 ? void 0 : Vue.version;
    var data = {
        type: ERRORTYPES.VUE_ERROR,
        message: err.message + "(" + info + ")",
        level: level,
        url: getLocationHref(),
        name: err.name,
        stack: err.stack || [],
        time: getTimestamp()
    };
    if (variableTypeDetection.isString(version)) {
        console.log('getBigVersion', getBigVersion(version));
        switch (getBigVersion(version)) {
            case 2:
                data = __assign(__assign({}, data), vue2VmHandler(vm));
                break;
            case 3:
                data = __assign(__assign({}, data), vue3VmHandler(vm));
                break;
            default:
                return;
        }
    }
    breadcrumb.push({
        type: BREADCRUMBTYPES.VUE,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.VUE),
        data: data,
        level: breadcrumbLevel
    });
    transportData.send(data);
}
function vue2VmHandler(vm) {
    var componentName = '';
    if (vm.$root === vm) {
        componentName = 'root';
    }
    else {
        var name_1 = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
        componentName =
            (name_1 ? 'component <' + name_1 + '>' : 'anonymous component') +
                (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
    }
    return {
        componentName: componentName,
        propsData: vm.$options && vm.$options.propsData
    };
}
function vue3VmHandler(vm) {
    var componentName = '';
    if (vm.$root === vm) {
        componentName = 'root';
    }
    else {
        console.log(vm.$options);
        var name_2 = vm.$options && vm.$options.name;
        componentName = name_2 ? 'component <' + name_2 + '>' : 'anonymous component';
    }
    return {
        componentName: componentName,
        propsData: vm.$props
    };
}

var hasConsole = typeof console !== 'undefined';
var MitoVue = {
    install: function (Vue) {
        if (getFlag(EVENTTYPES.VUE) || !Vue || !Vue.config)
            return;
        setFlag(EVENTTYPES.VUE, true);
        Vue.config.errorHandler = function (err, vm, info) {
            handleVueError.apply(null, [err, vm, info, Severity.Normal, Severity.Error, Vue]);
            if (hasConsole && !Vue.config.silent) {
                slientConsoleScope(function () {
                    console.error('Error in ' + info + ': "' + err.toString() + '"', vm);
                    console.error(err);
                });
            }
        };
    }
};

function errorBoundaryReport(ex) {
    if (!isError(ex)) {
        console.warn('传入的react error不是一个object Error');
        return;
    }
    var error = extractErrorStack(ex, Severity.Normal);
    error.type = ERRORTYPES.REACT_ERROR;
    breadcrumb.push({
        type: BREADCRUMBTYPES.REACT,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.REACT),
        data: error.name + ": " + error.message,
        level: Severity.fromString(error.level)
    });
    transportData.send(error);
}

function init(options) {
    if (options === void 0) { options = {}; }
    if (!isWxMiniEnv)
        return;
    initOptions(options);
    setupReplace();
    Object.assign(wx, { mitoLog: log, SDK_NAME: SDK_NAME, SDK_VERSION: SDK_VERSION });
}

export { MitoVue, errorBoundaryReport, init, sendTrackData, track };
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=wx-mini.esm.js.map
