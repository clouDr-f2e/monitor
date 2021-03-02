"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetAsString = exports.getNavigateBackTargetUrl = exports.getCurrentRoute = void 0;
var utils_1 = require("@mito/utils");
function getCurrentRoute() {
    if (!utils_1.variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    var currentPage = pages.pop();
    return utils_1.setUrlQuery(currentPage.route, currentPage.options);
}
exports.getCurrentRoute = getCurrentRoute;
function getNavigateBackTargetUrl(delta) {
    if (!utils_1.variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    delta = delta || 1;
    var toPage = pages[pages.length - delta];
    return utils_1.setUrlQuery(toPage.route, toPage.options);
}
exports.getNavigateBackTargetUrl = getNavigateBackTargetUrl;
function targetAsString(e) {
    var _a, _b;
    var id = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.id) ? " id=\"" + ((_b = e.currentTarget) === null || _b === void 0 ? void 0 : _b.id) + "\"" : '';
    var dataSets = Object.keys(e.currentTarget.dataset).map(function (key) {
        return "data-" + key + "=" + e.currentTarget.dataset[key];
    });
    return "<element " + id + " " + dataSets.join(' ') + "/>";
}
exports.targetAsString = targetAsString;
//# sourceMappingURL=utils.js.map