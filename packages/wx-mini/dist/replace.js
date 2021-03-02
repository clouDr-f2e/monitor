"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRoute = exports.replaceNetwork = exports.replaceBehavior = exports.replaceComponent = exports.replacePage = exports.replaceApp = exports.addReplaceHandler = void 0;
var core_1 = require("@mito/core");
var common_1 = require("@mito/common");
var utils_1 = require("@mito/utils");
var handleWxEvents_1 = require("./handleWxEvents");
var types_1 = require("@mito/types");
var utils_2 = require("./utils");
var constant_1 = require("./constant");
function isFilterHttpUrl(url) {
    return core_1.options.filterXhrUrlRegExp && core_1.options.filterXhrUrlRegExp.test(url);
}
function replace(type) {
    switch (type) {
        case common_1.EVENTTYPES.CONSOLE:
            replaceConsole();
            break;
        case common_1.EVENTTYPES.XHR:
            replaceNetwork();
            break;
        case common_1.EVENTTYPES.MINI_ROUTE:
            replaceRoute();
        default:
            break;
    }
}
function addReplaceHandler(handler) {
    if (!common_1.subscribeEvent(handler))
        return;
    replace(handler.type);
}
exports.addReplaceHandler = addReplaceHandler;
function replaceApp() {
    if (App) {
        var originApp_1 = App;
        App = function (appOptions) {
            var methods = [
                common_1.WxAppEvents.AppOnLaunch,
                common_1.WxAppEvents.AppOnShow,
                common_1.WxAppEvents.AppOnError,
                common_1.WxAppEvents.AppOnUnhandledRejection,
                common_1.WxAppEvents.AppOnPageNotFound,
                common_1.WxAppEvents.AppOnHide
            ];
            methods.forEach(function (method) {
                if (utils_1.getFlag(method))
                    return;
                addReplaceHandler({
                    callback: function (data) { return handleWxEvents_1.HandleWxAppEvents[method.replace('AppOn', 'on')](data); },
                    type: method
                });
                utils_1.replaceOld(appOptions, method.replace('AppOn', 'on'), function (originMethod) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        common_1.triggerHandlers.apply(null, __spreadArrays([method], args));
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
exports.replaceApp = replaceApp;
var pageLifeMethods = [
    common_1.WxPageEvents.PageOnShow,
    common_1.WxPageEvents.PageOnHide,
    common_1.WxPageEvents.PageOnShareAppMessage,
    common_1.WxPageEvents.PageOnShareTimeline,
    common_1.WxPageEvents.PageOnTabItemTap
];
function replacePageLifeMethods(options) {
    pageLifeMethods.forEach(function (method) {
        utils_1.replaceOld(options, method.replace('PageOn', 'on'), function (originMethod) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                common_1.triggerHandlers.apply(null, __spreadArrays([method], args));
                if (originMethod) {
                    originMethod.apply(this, args);
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
        if (utils_1.getFlag(method))
            return;
        addReplaceHandler({
            callback: function (data) { return handleWxEvents_1.HandleWxPageEvents[method.replace('PageOn', 'on')](data); },
            type: method
        });
    });
    Page = function (pageOptions) {
        replacePageLifeMethods(pageOptions);
        replaceAction(pageOptions);
        return originPage.call(this, pageOptions);
    };
}
exports.replacePage = replacePage;
function replaceComponent() {
    if (!Component) {
        return;
    }
    var originComponent = Component;
    Component = function (componentOptions) {
        if (!utils_1.isEmptyObject(componentOptions.methods)) {
            replacePageLifeMethods(componentOptions.methods);
            replaceAction(componentOptions.methods);
        }
        return originComponent.call(this, componentOptions);
    };
}
exports.replaceComponent = replaceComponent;
function replaceBehavior() {
    if (!Behavior) {
        return;
    }
    var originBehavior = Behavior;
    Behavior = function (behaviorOptions) {
        if (!utils_1.isEmptyObject(behaviorOptions.methods)) {
            replaceAction(behaviorOptions.methods);
        }
        return originBehavior.call(this, behaviorOptions);
    };
}
exports.replaceBehavior = replaceBehavior;
function replaceAction(options) {
    function gestureTrigger(e) {
        e.mitoWorked = true;
        common_1.triggerHandlers(common_1.EVENTTYPES.DOM, e);
    }
    var throttleGesturetrigger = utils_1.throttle(gestureTrigger, 500);
    var linstenerTypes = [constant_1.ELinstenerTypes.Touchmove, constant_1.ELinstenerTypes.Tap];
    Object.keys(options).forEach(function (m) {
        if ('function' !== typeof options[m]) {
            return;
        }
        utils_1.replaceOld(options, m, function (originMethod) {
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
    if (console && utils_1.variableTypeDetection.isObject(console)) {
        var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
        logType.forEach(function (level) {
            if (!(level in console))
                return;
            utils_1.replaceOld(console, level, function (originalConsole) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (originalConsole) {
                        common_1.triggerHandlers(common_1.EVENTTYPES.CONSOLE, { args: args, level: level });
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
                var options = args[0];
                var method;
                if (options.method) {
                    method = options.method;
                }
                else if (hook === 'downloadFile') {
                    method = types_1.EMethods.Get;
                }
                else {
                    method = types_1.EMethods.Post;
                }
                var url = options.url, header = options.header;
                if ((method === types_1.EMethods.Post && core_1.transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url)) {
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
                    type: common_1.HTTPTYPE.XHR,
                    method: method,
                    url: url,
                    reqData: reqData,
                    sTime: utils_1.getTimestamp()
                };
                core_1.setTraceId(url, function (headerFieldName, traceId) {
                    data.traceId = traceId;
                    header[headerFieldName] = traceId;
                });
                function setRequestHeader(key, value) {
                    header[key] = value;
                }
                core_1.options.beforeAppAjaxSend && core_1.options.beforeAppAjaxSend({ method: method, url: url }, { setRequestHeader: setRequestHeader });
                var successHandler = function (res) {
                    var endTime = utils_1.getTimestamp();
                    data.responseText = (utils_1.variableTypeDetection.isString(res.data) || utils_1.variableTypeDetection.isObject(res.data)) && res.data;
                    data.elapsedTime = endTime - data.sTime;
                    data.status = res.statusCode;
                    data.errMsg = res.errMsg;
                    common_1.triggerHandlers(common_1.EVENTTYPES.XHR, data);
                    if (typeof options.success === 'function') {
                        return options.success(res);
                    }
                };
                var _fail = options.fail;
                var failHandler = function (err) {
                    var endTime = utils_1.getTimestamp();
                    data.elapsedTime = endTime - data.sTime;
                    data.errMsg = err.errMsg;
                    common_1.triggerHandlers(common_1.EVENTTYPES.XHR, data);
                    if (utils_1.variableTypeDetection.isFunction(_fail)) {
                        return _fail(err);
                    }
                };
                var actOptions = __assign(__assign({}, options), { success: successHandler, fail: failHandler });
                return originRequest.call(this, actOptions);
            }
        });
    });
}
exports.replaceNetwork = replaceNetwork;
function replaceRoute() {
    var methods = [common_1.WxRouteEvents.SwitchTab, common_1.WxRouteEvents.ReLaunch, common_1.WxRouteEvents.RedirectTo, common_1.WxRouteEvents.NavigateTo, common_1.WxRouteEvents.NavigateBack];
    methods.forEach(function (method) {
        var originMethod = wx[method];
        Object.defineProperty(wx, method, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function (options) {
                var toUrl;
                if (method === common_1.WxRouteEvents.NavigateBack) {
                    toUrl = utils_2.getNavigateBackTargetUrl(options.delta);
                }
                else {
                    toUrl = options.url;
                }
                var data = {
                    from: utils_2.getCurrentRoute(),
                    to: toUrl
                };
                common_1.triggerHandlers(common_1.EVENTTYPES.MINI_ROUTE, data);
                if (utils_1.variableTypeDetection.isFunction(options.complete) ||
                    utils_1.variableTypeDetection.isFunction(options.success) ||
                    utils_1.variableTypeDetection.isFunction(options.fail)) {
                    var _fail_1 = options.fail;
                    var failHandler = function (res) {
                        var failData = __assign(__assign({}, data), { isFail: true, message: res.errMsg });
                        common_1.triggerHandlers(common_1.EVENTTYPES.MINI_ROUTE, failData);
                        if (utils_1.variableTypeDetection.isFunction(_fail_1)) {
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
exports.replaceRoute = replaceRoute;
//# sourceMappingURL=replace.js.map