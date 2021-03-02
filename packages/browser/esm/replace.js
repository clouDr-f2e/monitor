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
import { _global, on, getTimestamp, replaceOld, throttle, getLocationHref, isExistProperty, variableTypeDetection, supportsHistory } from '@mito/utils';
import { transportData, options, setTraceId } from '@mito/core';
import { EMethods } from '@mito/types';
import { subscribeEvent, triggerHandlers, EVENTTYPES, HTTPTYPE, HTTP_CODE } from '@mito/common';
var clickThrottle = throttle(triggerHandlers, 600);
function isFilterHttpUrl(url) {
    return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url);
}
function replace(type) {
    switch (type) {
        case EVENTTYPES.XHR:
            xhrReplace();
            break;
        case EVENTTYPES.FETCH:
            fetchReplace();
            break;
        case EVENTTYPES.ERROR:
            listenError();
            break;
        case EVENTTYPES.CONSOLE:
            consoleReplace();
            break;
        case EVENTTYPES.HISTORY:
            historyReplace();
            break;
        case EVENTTYPES.UNHANDLEDREJECTION:
            unhandledrejectionReplace();
            break;
        case EVENTTYPES.DOM:
            domReplace();
            break;
        case EVENTTYPES.HASHCHANGE:
            listenHashchange();
            break;
        default:
            break;
    }
}
export function addReplaceHandler(handler) {
    if (!subscribeEvent(handler))
        return;
    replace(handler.type);
}
function xhrReplace() {
    if (!('XMLHttpRequest' in _global)) {
        return;
    }
    var originalXhrProto = XMLHttpRequest.prototype;
    replaceOld(originalXhrProto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.mito_xhr = {
                method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
                url: args[1],
                sTime: getTimestamp(),
                type: HTTPTYPE.XHR
            };
            originalOpen.apply(this, args);
        };
    });
    replaceOld(originalXhrProto, 'send', function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a = this.mito_xhr, method = _a.method, url = _a.url;
            setTraceId(url, function (headerFieldName, traceId) {
                _this.mito_xhr.traceId = traceId;
                _this.setRequestHeader(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, this);
            on(this, 'loadend', function () {
                if ((method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url))
                    return;
                var _a = this, responseType = _a.responseType, response = _a.response, status = _a.status;
                this.mito_xhr.reqData = args[0];
                var eTime = getTimestamp();
                this.mito_xhr.time = eTime;
                this.mito_xhr.status = status;
                if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                    this.mito_xhr.responseText = typeof response === 'object' ? JSON.stringify(response) : response;
                }
                this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime;
                triggerHandlers(EVENTTYPES.XHR, this.mito_xhr);
            });
            originalSend.apply(this, args);
        };
    });
}
function fetchReplace() {
    if (!('fetch' in _global)) {
        return;
    }
    replaceOld(_global, EVENTTYPES.FETCH, function (originalFetch) {
        return function (url, config) {
            if (config === void 0) { config = {}; }
            var sTime = getTimestamp();
            var method = (config && config.method) || 'GET';
            var handlerData = {
                type: HTTPTYPE.FETCH,
                method: method,
                reqData: config && config.body,
                url: url
            };
            var headers = new Headers(config.headers || {});
            Object.assign(headers, {
                setRequestHeader: headers.set
            });
            setTraceId(url, function (headerFieldName, traceId) {
                handlerData.traceId = traceId;
                headers.set(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, headers);
            config = __assign(__assign({}, config), { headers: headers });
            return originalFetch.apply(_global, [url, config]).then(function (res) {
                var tempRes = res.clone();
                var eTime = getTimestamp();
                handlerData = __assign(__assign({}, handlerData), { elapsedTime: eTime - sTime, status: tempRes.status, time: eTime });
                tempRes.text().then(function (data) {
                    if (method === EMethods.Post && transportData.isSdkTransportUrl(url))
                        return;
                    if (isFilterHttpUrl(url))
                        return;
                    handlerData.responseText = tempRes.status > HTTP_CODE.UNAUTHORIZED && data;
                    triggerHandlers(EVENTTYPES.FETCH, handlerData);
                });
                return res;
            }, function (err) {
                var eTime = getTimestamp();
                if (method === EMethods.Post && transportData.isSdkTransportUrl(url))
                    return;
                if (isFilterHttpUrl(url))
                    return;
                handlerData = __assign(__assign({}, handlerData), { elapsedTime: eTime - sTime, status: 0, time: eTime });
                triggerHandlers(EVENTTYPES.FETCH, handlerData);
                throw err;
            });
        };
    });
}
function listenHashchange() {
    if (!isExistProperty(_global, 'onpopstate')) {
        on(_global, EVENTTYPES.HASHCHANGE, function (e) {
            triggerHandlers(EVENTTYPES.HASHCHANGE, e);
        });
    }
}
function listenError() {
    on(_global, 'error', function (e) {
        triggerHandlers(EVENTTYPES.ERROR, e);
    }, true);
}
function consoleReplace() {
    if (!('console' in _global)) {
        return;
    }
    var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
    logType.forEach(function (level) {
        if (!(level in _global.console))
            return;
        replaceOld(_global.console, level, function (originalConsole) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (originalConsole) {
                    triggerHandlers(EVENTTYPES.CONSOLE, { args: args, level: level });
                    originalConsole.apply(_global.console, args);
                }
            };
        });
    });
}
var lastHref;
lastHref = getLocationHref();
function historyReplace() {
    if (!supportsHistory())
        return;
    var oldOnpopstate = _global.onpopstate;
    _global.onpopstate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var to = getLocationHref();
        var from = lastHref;
        triggerHandlers(EVENTTYPES.HISTORY, {
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
                triggerHandlers(EVENTTYPES.HISTORY, {
                    from: from,
                    to: to
                });
            }
            return originalHistoryFn.apply(this, args);
        };
    }
    replaceOld(_global.history, 'pushState', historyReplaceFn);
    replaceOld(_global.history, 'replaceState', historyReplaceFn);
}
function unhandledrejectionReplace() {
    on(_global, EVENTTYPES.UNHANDLEDREJECTION, function (ev) {
        triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, ev);
    });
}
function domReplace() {
    if (!('document' in _global))
        return;
    on(_global.document, 'click', function () {
        clickThrottle(EVENTTYPES.DOM, {
            category: 'click',
            data: this
        });
    }, true);
}
//# sourceMappingURL=replace.js.map