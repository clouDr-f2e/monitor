"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.setTraceId = exports.Options = void 0;
var utils_1 = require("@mito/utils");
var Options = (function () {
    function Options() {
        this.traceIdFieldName = 'Trace-Id';
        this.enableTraceId = false;
    }
    Options.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var beforeAppAjaxSend = options.beforeAppAjaxSend, enableTraceId = options.enableTraceId, filterXhrUrlRegExp = options.filterXhrUrlRegExp, traceIdFieldName = options.traceIdFieldName, includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp;
        utils_1.validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend);
        utils_1.validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId);
        utils_1.validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName);
        utils_1.toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
        utils_1.toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', '[object RegExp]') &&
            (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp);
    };
    return Options;
}());
exports.Options = Options;
var options = utils_1._support.options || (utils_1._support.options = new Options());
exports.options = options;
function setTraceId(httpUrl, callback) {
    var includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp, enableTraceId = options.enableTraceId;
    if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
        var traceId = utils_1.generateUUID();
        callback(options.traceIdFieldName, traceId);
    }
}
exports.setTraceId = setTraceId;
//# sourceMappingURL=options.js.map