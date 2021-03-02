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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReplaceHandler = void 0;
var utils_1 = require("@mito/utils");
var core_1 = require("@mito/core");
var types_1 = require("@mito/types");
var common_1 = require("@mito/common");
var clickThrottle = utils_1.throttle(common_1.triggerHandlers, 600);
function isFilterHttpUrl(url) {
    return core_1.options.filterXhrUrlRegExp && core_1.options.filterXhrUrlRegExp.test(url);
}
function replace(type) {
    switch (type) {
        case common_1.EVENTTYPES.XHR:
            xhrReplace();
            break;
        case common_1.EVENTTYPES.FETCH:
            fetchReplace();
            break;
        case common_1.EVENTTYPES.ERROR:
            listenError();
            break;
        case common_1.EVENTTYPES.CONSOLE:
            consoleReplace();
            break;
        case common_1.EVENTTYPES.HISTORY:
            historyReplace();
            break;
        case common_1.EVENTTYPES.UNHANDLEDREJECTION:
            unhandledrejectionReplace();
            break;
        case common_1.EVENTTYPES.DOM:
            domReplace();
            break;
        case common_1.EVENTTYPES.HASHCHANGE:
            listenHashchange();
            break;
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
function xhrReplace() {
    if (!('XMLHttpRequest' in utils_1._global)) {
        return;
    }
    var originalXhrProto = XMLHttpRequest.prototype;
    utils_1.replaceOld(originalXhrProto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.mito_xhr = {
                method: utils_1.variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
                url: args[1],
                sTime: utils_1.getTimestamp(),
                type: common_1.HTTPTYPE.XHR
            };
            originalOpen.apply(this, args);
        };
    });
    utils_1.replaceOld(originalXhrProto, 'send', function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a = this.mito_xhr, method = _a.method, url = _a.url;
            core_1.setTraceId(url, function (headerFieldName, traceId) {
                _this.mito_xhr.traceId = traceId;
                _this.setRequestHeader(headerFieldName, traceId);
            });
            core_1.options.beforeAppAjaxSend && core_1.options.beforeAppAjaxSend({ method: method, url: url }, this);
            utils_1.on(this, 'loadend', function () {
                if ((method === types_1.EMethods.Post && core_1.transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url))
                    return;
                var _a = this, responseType = _a.responseType, response = _a.response, status = _a.status;
                this.mito_xhr.reqData = args[0];
                var eTime = utils_1.getTimestamp();
                this.mito_xhr.time = eTime;
                this.mito_xhr.status = status;
                if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                    this.mito_xhr.responseText = typeof response === 'object' ? JSON.stringify(response) : response;
                }
                this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime;
                common_1.triggerHandlers(common_1.EVENTTYPES.XHR, this.mito_xhr);
            });
            originalSend.apply(this, args);
        };
    });
}
function fetchReplace() {
    if (!('fetch' in utils_1._global)) {
        return;
    }
    utils_1.replaceOld(utils_1._global, common_1.EVENTTYPES.FETCH, function (originalFetch) {
        return function (url, config) {
            if (config === void 0) { config = {}; }
            var sTime = utils_1.getTimestamp();
            var method = (config && config.method) || 'GET';
            var handlerData = {
                type: common_1.HTTPTYPE.FETCH,
                method: method,
                reqData: config && config.body,
                url: url
            };
            var headers = new Headers(config.headers || {});
            Object.assign(headers, {
                setRequestHeader: headers.set
            });
            core_1.setTraceId(url, function (headerFieldName, traceId) {
                handlerData.traceId = traceId;
                headers.set(headerFieldName, traceId);
            });
            core_1.options.beforeAppAjaxSend && core_1.options.beforeAppAjaxSend({ method: method, url: url }, headers);
            config = __assign(__assign({}, config), { headers: headers });
            return originalFetch.apply(utils_1._global, [url, config]).then(function (res) {
                var tempRes = res.clone();
                var eTime = utils_1.getTimestamp();
                handlerData = __assign(__assign({}, handlerData), { elapsedTime: eTime - sTime, status: tempRes.status, time: eTime });
                tempRes.text().then(function (data) {
                    if (method === types_1.EMethods.Post && core_1.transportData.isSdkTransportUrl(url))
                        return;
                    if (isFilterHttpUrl(url))
                        return;
                    handlerData.responseText = tempRes.status > common_1.HTTP_CODE.UNAUTHORIZED && data;
                    common_1.triggerHandlers(common_1.EVENTTYPES.FETCH, handlerData);
                });
                return res;
            }, function (err) {
                var eTime = utils_1.getTimestamp();
                if (method === types_1.EMethods.Post && core_1.transportData.isSdkTransportUrl(url))
                    return;
                if (isFilterHttpUrl(url))
                    return;
                handlerData = __assign(__assign({}, handlerData), { elapsedTime: eTime - sTime, status: 0, time: eTime });
                common_1.triggerHandlers(common_1.EVENTTYPES.FETCH, handlerData);
                throw err;
            });
        };
    });
}
function listenHashchange() {
    if (!utils_1.isExistProperty(utils_1._global, 'onpopstate')) {
        utils_1.on(utils_1._global, common_1.EVENTTYPES.HASHCHANGE, function (e) {
            common_1.triggerHandlers(common_1.EVENTTYPES.HASHCHANGE, e);
        });
    }
}
function listenError() {
    utils_1.on(utils_1._global, 'error', function (e) {
        common_1.triggerHandlers(common_1.EVENTTYPES.ERROR, e);
    }, true);
}
function consoleReplace() {
    if (!('console' in utils_1._global)) {
        return;
    }
    var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
    logType.forEach(function (level) {
        if (!(level in utils_1._global.console))
            return;
        utils_1.replaceOld(utils_1._global.console, level, function (originalConsole) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (originalConsole) {
                    common_1.triggerHandlers(common_1.EVENTTYPES.CONSOLE, { args: args, level: level });
                    originalConsole.apply(utils_1._global.console, args);
                }
            };
        });
    });
}
var lastHref;
lastHref = utils_1.getLocationHref();
function historyReplace() {
    if (!utils_1.supportsHistory())
        return;
    var oldOnpopstate = utils_1._global.onpopstate;
    utils_1._global.onpopstate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var to = utils_1.getLocationHref();
        var from = lastHref;
        common_1.triggerHandlers(common_1.EVENTTYPES.HISTORY, {
            from: from,
            to: to
        });
        oldOnpopstate && oldOnpopstate.apply(this, args);
    };
    function historyReplaceFn(originalHistoryFn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var url = args.length > 2 ? args[2] : undefined;
            if (url) {
                var from = lastHref;
                var to = String(url);
                lastHref = to;
                common_1.triggerHandlers(common_1.EVENTTYPES.HISTORY, {
                    from: from,
                    to: to
                });
            }
            return originalHistoryFn.apply(this, args);
        };
    }
    utils_1.replaceOld(utils_1._global.history, 'pushState', historyReplaceFn);
    utils_1.replaceOld(utils_1._global.history, 'replaceState', historyReplaceFn);
}
function unhandledrejectionReplace() {
    utils_1.on(utils_1._global, common_1.EVENTTYPES.UNHANDLEDREJECTION, function (ev) {
        common_1.triggerHandlers(common_1.EVENTTYPES.UNHANDLEDREJECTION, ev);
    });
}
function domReplace() {
    if (!('document' in utils_1._global))
        return;
    utils_1.on(utils_1._global.document, 'click', function () {
        clickThrottle(common_1.EVENTTYPES.DOM, {
            category: 'click',
            data: this
        });
    }, true);
}
//# sourceMappingURL=replace.js.map