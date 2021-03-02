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
exports.HandleEvents = void 0;
var common_1 = require("@mito/common");
var core_1 = require("@mito/core");
var utils_1 = require("@mito/utils");
var HandleEvents = {
    handleHttp: function (data, type) {
        var isError = data.status === 0 || data.status === common_1.HTTP_CODE.BAD_REQUEST || data.status > common_1.HTTP_CODE.UNAUTHORIZED;
        var result = core_1.httpTransform(data);
        core_1.breadcrumb.push({
            type: type,
            category: core_1.breadcrumb.getCategory(type),
            data: __assign({}, result),
            level: utils_1.Severity.Info
        });
        if (isError) {
            core_1.breadcrumb.push({
                type: type,
                category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CODE_ERROR),
                data: __assign({}, result),
                level: utils_1.Severity.Error
            });
            core_1.transportData.send(result);
        }
    },
    handleError: function (errorEvent) {
        var target = errorEvent.target;
        if (target.localName) {
            var data = core_1.resourceTransform(errorEvent.target);
            core_1.breadcrumb.push({
                type: common_1.BREADCRUMBTYPES.RESOURCE,
                category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.RESOURCE),
                data: data,
                level: utils_1.Severity.Error
            });
            return core_1.transportData.send(data);
        }
        var message = errorEvent.message, filename = errorEvent.filename, lineno = errorEvent.lineno, colno = errorEvent.colno, error = errorEvent.error;
        var result;
        if (error && utils_1.isError(error)) {
            result = utils_1.extractErrorStack(error, utils_1.Severity.Normal);
        }
        result || (result = HandleEvents.handleNotErrorInstance(message, filename, lineno, colno));
        result.type = common_1.ERRORTYPES.JAVASCRIPT_ERROR;
        core_1.breadcrumb.push({
            type: common_1.BREADCRUMBTYPES.CODE_ERROR,
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CODE_ERROR),
            data: __assign({}, result),
            level: utils_1.Severity.Error
        });
        core_1.transportData.send(result);
    },
    handleNotErrorInstance: function (message, filename, lineno, colno) {
        var name = common_1.ERRORTYPES.UNKNOWN;
        var url = filename || utils_1.getLocationHref();
        var msg = message;
        var matches = message.match(common_1.ERROR_TYPE_RE);
        if (matches[1]) {
            name = matches[1];
            msg = matches[2];
        }
        var element = {
            url: url,
            func: common_1.ERRORTYPES.UNKNOWN_FUNCTION,
            args: common_1.ERRORTYPES.UNKNOWN,
            line: lineno,
            col: colno
        };
        return {
            url: url,
            name: name,
            message: msg,
            level: utils_1.Severity.Normal,
            time: utils_1.getTimestamp(),
            stack: [element]
        };
    },
    handleHistory: function (data) {
        var from = data.from, to = data.to;
        var parsedFrom = utils_1.parseUrlToObj(from).relative;
        var parsedTo = utils_1.parseUrlToObj(to).relative;
        core_1.breadcrumb.push({
            type: common_1.BREADCRUMBTYPES.ROUTE,
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.ROUTE),
            data: {
                from: parsedFrom ? parsedFrom : '/',
                to: parsedTo ? parsedTo : '/'
            },
            level: utils_1.Severity.Info
        });
    },
    handleHashchange: function (data) {
        var oldURL = data.oldURL, newURL = data.newURL;
        var from = utils_1.parseUrlToObj(oldURL).relative;
        var to = utils_1.parseUrlToObj(newURL).relative;
        core_1.breadcrumb.push({
            type: common_1.BREADCRUMBTYPES.ROUTE,
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.ROUTE),
            data: {
                from: from,
                to: to
            },
            level: utils_1.Severity.Info
        });
    },
    handleUnhandleRejection: function (ev) {
        var data = {
            type: common_1.ERRORTYPES.PROMISE_ERROR,
            message: utils_1.unknownToString(ev.reason),
            url: utils_1.getLocationHref(),
            name: ev.type,
            time: utils_1.getTimestamp(),
            level: utils_1.Severity.Low
        };
        if (utils_1.isError(ev.reason)) {
            data = __assign(__assign({}, data), utils_1.extractErrorStack(ev.reason, utils_1.Severity.Low));
        }
        core_1.breadcrumb.push({
            type: common_1.BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: __assign({}, data),
            level: utils_1.Severity.Error
        });
        core_1.transportData.send(data);
    }
};
exports.HandleEvents = HandleEvents;
//# sourceMappingURL=handleEvents.js.map