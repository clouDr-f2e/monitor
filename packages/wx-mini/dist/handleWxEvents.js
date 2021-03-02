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
exports.HandleWxEvents = exports.HandleNetworkEvents = exports.HandleWxConsoleEvents = exports.HandleWxPageEvents = exports.HandleWxAppEvents = void 0;
var common_1 = require("@mito/common");
var core_1 = require("@mito/core");
var utils_1 = require("@mito/utils");
var utils_2 = require("@mito/utils");
var utils_3 = require("./utils");
var browser_1 = require("@mito/browser");
var constant_1 = require("./constant");
var HandleWxAppEvents = {
    onLaunch: function (options) {
        var data = {
            path: options.path,
            query: options.query
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.APP_ON_LAUNCH),
            type: common_1.BREADCRUMBTYPES.APP_ON_LAUNCH,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onShow: function (options) {
        var data = {
            path: options.path,
            query: options.query
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.APP_ON_SHOW),
            type: common_1.BREADCRUMBTYPES.APP_ON_SHOW,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onHide: function () {
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.APP_ON_HIDE),
            type: common_1.BREADCRUMBTYPES.APP_ON_HIDE,
            data: null,
            level: utils_2.Severity.Info
        });
    },
    onError: function (error) {
        var parsedError = utils_1.parseErrorString(error);
        var data = __assign(__assign({}, parsedError), { time: utils_1.getTimestamp(), level: utils_2.Severity.Normal, url: utils_3.getCurrentRoute(), type: common_1.ERRORTYPES.JAVASCRIPT_ERROR });
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CODE_ERROR),
            type: common_1.BREADCRUMBTYPES.CODE_ERROR,
            level: utils_2.Severity.Error,
            data: __assign({}, data)
        });
        core_1.transportData.send(data);
    },
    onUnhandledRejection: function (ev) {
        var data = {
            type: common_1.ERRORTYPES.PROMISE_ERROR,
            message: utils_1.unknownToString(ev.reason),
            url: utils_3.getCurrentRoute(),
            name: 'unhandledrejection',
            time: utils_1.getTimestamp(),
            level: utils_2.Severity.Low
        };
        if (utils_1.isError(ev.reason)) {
            data = __assign(__assign(__assign({}, data), utils_1.extractErrorStack(ev.reason, utils_2.Severity.Low)), { url: utils_3.getCurrentRoute() });
        }
        core_1.breadcrumb.push({
            type: common_1.BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: __assign({}, data),
            level: utils_2.Severity.Error
        });
        core_1.transportData.send(data);
    },
    onPageNotFound: function (data) {
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.ROUTE),
            type: common_1.BREADCRUMBTYPES.ROUTE,
            data: data,
            level: utils_2.Severity.Error
        });
    }
};
exports.HandleWxAppEvents = HandleWxAppEvents;
var HandleWxPageEvents = {
    onShow: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.PAGE_ON_SHOW),
            type: common_1.BREADCRUMBTYPES.PAGE_ON_SHOW,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onHide: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.PAGE_ON_HIDE),
            type: common_1.BREADCRUMBTYPES.PAGE_ON_HIDE,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onShareAppMessage: function (options) {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options,
            options: options
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE),
            type: common_1.BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onShareTimeline: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE),
            type: common_1.BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onTabItemTap: function (options) {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options,
            options: options
        };
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP),
            type: common_1.BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP,
            data: data,
            level: utils_2.Severity.Info
        });
    },
    onAction: function (e) {
        var type = common_1.BREADCRUMBTYPES.TOUCHMOVE;
        if (e.type === constant_1.ELinstenerTypes.Tap) {
            type = common_1.BREADCRUMBTYPES.TAP;
        }
        core_1.breadcrumb.push({
            category: core_1.breadcrumb.getCategory(type),
            type: type,
            data: utils_3.targetAsString(e),
            level: utils_2.Severity.Info
        });
    }
};
exports.HandleWxPageEvents = HandleWxPageEvents;
var HandleWxConsoleEvents = {
    console: function (data) {
        browser_1.HandleEvents.handleConsole(data);
    }
};
exports.HandleWxConsoleEvents = HandleWxConsoleEvents;
var HandleNetworkEvents = {
    handleRequest: function (data) {
        var result = core_1.httpTransform(data);
        result.url = utils_3.getCurrentRoute();
        if (data.status === undefined) {
            result.message = data.errMsg;
        }
        var type = common_1.BREADCRUMBTYPES.XHR;
        core_1.breadcrumb.push({
            type: type,
            category: core_1.breadcrumb.getCategory(type),
            data: result,
            level: utils_2.Severity.Info
        });
        if (utils_1.isHttpFail(data.status)) {
            core_1.breadcrumb.push({
                type: type,
                category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CODE_ERROR),
                data: __assign({}, result),
                level: utils_2.Severity.Error
            });
            core_1.transportData.send(result);
        }
    }
};
exports.HandleNetworkEvents = HandleNetworkEvents;
var HandleWxEvents = {
    handleRoute: function (data) {
        if (data.isFail) {
            core_1.breadcrumb.push({
                type: common_1.BREADCRUMBTYPES.ROUTE,
                category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CODE_ERROR),
                data: data,
                level: utils_2.Severity.Error
            });
            var reportData = {
                type: common_1.ERRORTYPES.ROUTE_ERROR,
                message: data.message,
                url: data.to,
                name: 'MINI_' + common_1.ERRORTYPES.ROUTE_ERROR,
                level: utils_2.Severity.Error
            };
            return core_1.transportData.send(reportData);
        }
        core_1.breadcrumb.push({
            type: common_1.BREADCRUMBTYPES.ROUTE,
            category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.ROUTE),
            data: data,
            level: utils_2.Severity.Info
        });
    }
};
exports.HandleWxEvents = HandleWxEvents;
//# sourceMappingURL=handleWxEvents.js.map