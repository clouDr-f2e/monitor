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
import { BREADCRUMBTYPES, ERRORTYPES, ERROR_TYPE_RE, HTTP_CODE } from '@mito/common';
import { transportData, breadcrumb, resourceTransform, httpTransform } from '@mito/core';
import { getLocationHref, getTimestamp, isError, parseUrlToObj, extractErrorStack, unknownToString, Severity } from '@mito/utils';
var HandleEvents = {
    handleHttp: function (data, type) {
        var isError = data.status === 0 || data.status === HTTP_CODE.BAD_REQUEST || data.status > HTTP_CODE.UNAUTHORIZED;
        var result = httpTransform(data);
        breadcrumb.push({
            type: type,
            category: breadcrumb.getCategory(type),
            data: __assign({}, result),
            level: Severity.Info
        });
        if (isError) {
            breadcrumb.push({
                type: type,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: __assign({}, result),
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
            data: __assign({}, result),
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
            data: __assign({}, data),
            level: Severity.Error
        });
        transportData.send(data);
    }
};
export { HandleEvents };
//# sourceMappingURL=handleEvents.js.map