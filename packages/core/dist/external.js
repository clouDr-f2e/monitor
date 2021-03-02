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
exports.log = void 0;
var common_1 = require("@mito/common");
var utils_1 = require("@mito/utils");
var transportData_1 = require("./transportData");
var breadcrumb_1 = require("./breadcrumb");
function log(_a) {
    var _b = _a.message, message = _b === void 0 ? 'emptyMsg' : _b, _c = _a.tag, tag = _c === void 0 ? '' : _c, _d = _a.level, level = _d === void 0 ? utils_1.Severity.Critical : _d, _e = _a.ex, ex = _e === void 0 ? '' : _e;
    var errorInfo = {};
    if (utils_1.isError(ex)) {
        errorInfo = utils_1.extractErrorStack(ex, level);
    }
    var error = __assign({ type: common_1.ERRORTYPES.LOG_ERROR, level: level, message: utils_1.unknownToString(message), name: 'MITO.log', customTag: utils_1.unknownToString(tag), time: utils_1.getTimestamp(), url: utils_1.isWxMiniEnv ? '' : utils_1.getLocationHref() }, errorInfo);
    breadcrumb_1.breadcrumb.push({
        type: common_1.BREADCRUMBTYPES.CUSTOMER,
        category: breadcrumb_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CUSTOMER),
        data: message,
        level: utils_1.Severity.fromString(level.toString())
    });
    transportData_1.transportData.send(error);
}
exports.log = log;
//# sourceMappingURL=external.js.map