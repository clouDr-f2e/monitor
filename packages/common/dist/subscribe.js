"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerHandlers = exports.subscribeEvent = void 0;
var utils_1 = require("@mito/utils");
var handlers = {};
function subscribeEvent(handler) {
    if (!handler || utils_1.getFlag(handler.type))
        return false;
    utils_1.setFlag(handler.type, true);
    handlers[handler.type] = handlers[handler.type] || [];
    handlers[handler.type].push(handler.callback);
    return true;
}
exports.subscribeEvent = subscribeEvent;
function triggerHandlers(type, data) {
    if (!type || !handlers[type])
        return;
    handlers[type].forEach(function (callback) {
        utils_1.nativeTryCatch(function () {
            callback(data);
        }, function (e) {
            utils_1.logger.error("\u91CD\u5199\u4E8B\u4EF6triggerHandlers\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\nType:" + type + "\nName: " + utils_1.getFunctionName(callback) + "\nError: " + e);
        });
    });
}
exports.triggerHandlers = triggerHandlers;
//# sourceMappingURL=subscribe.js.map