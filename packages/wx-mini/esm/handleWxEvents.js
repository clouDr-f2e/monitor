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
import { BREADCRUMBTYPES, ERRORTYPES } from '@mito/common';
import { breadcrumb, httpTransform, transportData } from '@mito/core';
import { extractErrorStack, getTimestamp, isError, isHttpFail, parseErrorString, unknownToString } from '@mito/utils';
import { Severity } from '@mito/utils';
import { getCurrentRoute, targetAsString } from './utils';
import { HandleEvents } from '@mito/browser';
import { ELinstenerTypes } from './constant';
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
    },
    onAction: function (e) {
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
export { HandleWxAppEvents, HandleWxPageEvents, HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents };
//# sourceMappingURL=handleWxEvents.js.map