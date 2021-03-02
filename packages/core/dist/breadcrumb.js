"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumb = exports.Breadcrumb = void 0;
var common_1 = require("@mito/common");
var utils_1 = require("@mito/utils");
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
            utils_1.slientConsoleScope(function () {
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
        data.time = utils_1.getTimestamp();
        if (this.stack.length >= this.maxBreadcrumbs) {
            this.shift();
        }
        this.stack.push(data);
        utils_1.logger.log(this.stack);
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
            case common_1.BREADCRUMBTYPES.XHR:
            case common_1.BREADCRUMBTYPES.FETCH:
                return common_1.BREADCRUMBCATEGORYS.HTTP;
            case common_1.BREADCRUMBTYPES.CLICK:
            case common_1.BREADCRUMBTYPES.ROUTE:
            case common_1.BREADCRUMBTYPES.TAP:
            case common_1.BREADCRUMBTYPES.TOUCHMOVE:
                return common_1.BREADCRUMBCATEGORYS.USER;
            case common_1.BREADCRUMBTYPES.CUSTOMER:
            case common_1.BREADCRUMBTYPES.CONSOLE:
                return common_1.BREADCRUMBCATEGORYS.DEBUG;
            case common_1.BREADCRUMBTYPES.APP_ON_LAUNCH:
            case common_1.BREADCRUMBTYPES.APP_ON_SHOW:
            case common_1.BREADCRUMBTYPES.APP_ON_HIDE:
            case common_1.BREADCRUMBTYPES.PAGE_ON_SHOW:
            case common_1.BREADCRUMBTYPES.PAGE_ON_HIDE:
            case common_1.BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE:
            case common_1.BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE:
            case common_1.BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP:
                return common_1.BREADCRUMBCATEGORYS.LIFECYCLE;
            case common_1.BREADCRUMBTYPES.UNHANDLEDREJECTION:
            case common_1.BREADCRUMBTYPES.CODE_ERROR:
            case common_1.BREADCRUMBTYPES.RESOURCE:
            case common_1.BREADCRUMBTYPES.VUE:
            case common_1.BREADCRUMBTYPES.REACT:
            default:
                return common_1.BREADCRUMBCATEGORYS.EXCEPTION;
        }
    };
    Breadcrumb.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var maxBreadcrumbs = options.maxBreadcrumbs, beforePushBreadcrumb = options.beforePushBreadcrumb;
        utils_1.validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs);
        utils_1.validateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'function') && (this.beforePushBreadcrumb = beforePushBreadcrumb);
    };
    return Breadcrumb;
}());
exports.Breadcrumb = Breadcrumb;
var breadcrumb = utils_1._support.breadcrumb || (utils_1._support.breadcrumb = new Breadcrumb());
exports.breadcrumb = breadcrumb;
//# sourceMappingURL=breadcrumb.js.map