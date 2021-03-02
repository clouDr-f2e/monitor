var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { options as sdkOptions, setTraceId, transportData } from '@mito/core';
import { subscribeEvent, triggerHandlers, WxAppEvents, WxPageEvents, WxRouteEvents, EVENTTYPES, HTTPTYPE } from '@mito/common';
import { getTimestamp, replaceOld, throttle, getFlag, isEmptyObject, variableTypeDetection } from '@mito/utils';
import { HandleWxAppEvents, HandleWxPageEvents } from './handleWxEvents';
import { EMethods } from '@mito/types';
import { getCurrentRoute, getNavigateBackTargetUrl } from './utils';
import { ELinstenerTypes } from './constant';
function isFilterHttpUrl(url) {
    return sdkOptions.filterXhrUrlRegExp && sdkOptions.filterXhrUrlRegExp.test(url);
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
        default:
            break;
    }
}
export function addReplaceHandler(handler) {
    if (!subscribeEvent(handler))
        return;
    replace(handler.type);
}
export function replaceApp() {
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
                    originMethod.apply(this, args);
                }
            };
        }, true);
    });
}
export function replacePage() {
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
export function replaceComponent() {
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
export function replaceBehavior() {
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
export function replaceNetwork() {
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
                var options = args[0];
                var method;
                if (options.method) {
                    method = options.method;
                }
                else if (hook === 'downloadFile') {
                    method = EMethods.Get;
                }
                else {
                    method = EMethods.Post;
                }
                var url = options.url, header = options.header;
                if ((method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) {
                    return originRequest.call(this, options);
                }
                var reqData;
                if (hook === 'request') {
                    reqData = options.data;
                }
                else if (hook === 'downloadFile') {
                    reqData = {
                        filePath: options.filePath
                    };
                }
                else {
                    reqData = {
                        filePath: options.filePath,
                        name: options.name
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
                sdkOptions.beforeAppAjaxSend && sdkOptions.beforeAppAjaxSend({ method: method, url: url }, { setRequestHeader: setRequestHeader });
                var successHandler = function (res) {
                    var endTime = getTimestamp();
                    data.responseText = (variableTypeDetection.isString(res.data) || variableTypeDetection.isObject(res.data)) && res.data;
                    data.elapsedTime = endTime - data.sTime;
                    data.status = res.statusCode;
                    data.errMsg = res.errMsg;
                    triggerHandlers(EVENTTYPES.XHR, data);
                    if (typeof options.success === 'function') {
                        return options.success(res);
                    }
                };
                var _fail = options.fail;
                var failHandler = function (err) {
                    var endTime = getTimestamp();
                    data.elapsedTime = endTime - data.sTime;
                    data.errMsg = err.errMsg;
                    triggerHandlers(EVENTTYPES.XHR, data);
                    if (variableTypeDetection.isFunction(_fail)) {
                        return _fail(err);
                    }
                };
                var actOptions = __assign(__assign({}, options), { success: successHandler, fail: failHandler });
                return originRequest.call(this, actOptions);
            }
        });
    });
}
export function replaceRoute() {
    var methods = [WxRouteEvents.SwitchTab, WxRouteEvents.ReLaunch, WxRouteEvents.RedirectTo, WxRouteEvents.NavigateTo, WxRouteEvents.NavigateBack];
    methods.forEach(function (method) {
        var originMethod = wx[method];
        Object.defineProperty(wx, method, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function (options) {
                var toUrl;
                if (method === WxRouteEvents.NavigateBack) {
                    toUrl = getNavigateBackTargetUrl(options.delta);
                }
                else {
                    toUrl = options.url;
                }
                var data = {
                    from: getCurrentRoute(),
                    to: toUrl
                };
                triggerHandlers(EVENTTYPES.MINI_ROUTE, data);
                if (variableTypeDetection.isFunction(options.complete) ||
                    variableTypeDetection.isFunction(options.success) ||
                    variableTypeDetection.isFunction(options.fail)) {
                    var _fail_1 = options.fail;
                    var failHandler = function (res) {
                        var failData = __assign(__assign({}, data), { isFail: true, message: res.errMsg });
                        triggerHandlers(EVENTTYPES.MINI_ROUTE, failData);
                        if (variableTypeDetection.isFunction(_fail_1)) {
                            return _fail_1(res);
                        }
                    };
                    options.fail = failHandler;
                }
                return originMethod.call(this, options);
            }
        });
    });
}
//# sourceMappingURL=replace.js.map