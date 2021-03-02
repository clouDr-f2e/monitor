"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupReplace = void 0;
var handleEvents_1 = require("./handleEvents");
var utils_1 = require("@mito/utils");
var common_1 = require("@mito/common");
var core_1 = require("@mito/core");
var replace_1 = require("./replace");
function setupReplace() {
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleEvents_1.HandleEvents.handleHttp(data, common_1.BREADCRUMBTYPES.XHR);
        },
        type: common_1.EVENTTYPES.XHR
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleEvents_1.HandleEvents.handleHttp(data, common_1.BREADCRUMBTYPES.FETCH);
        },
        type: common_1.EVENTTYPES.FETCH
    });
    replace_1.addReplaceHandler({
        callback: function (error) {
            handleEvents_1.HandleEvents.handleError(error);
        },
        type: common_1.EVENTTYPES.ERROR
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleConsole(data);
        },
        type: common_1.EVENTTYPES.CONSOLE
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleEvents_1.HandleEvents.handleHistory(data);
        },
        type: common_1.EVENTTYPES.HISTORY
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleEvents_1.HandleEvents.handleUnhandleRejection(data);
        },
        type: common_1.EVENTTYPES.UNHANDLEDREJECTION
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            var htmlString = utils_1.htmlElementAsString(data.data.activeElement);
            if (htmlString) {
                core_1.breadcrumb.push({
                    type: common_1.BREADCRUMBTYPES.CLICK,
                    category: core_1.breadcrumb.getCategory(common_1.BREADCRUMBTYPES.CLICK),
                    data: htmlString,
                    level: utils_1.Severity.Info
                });
            }
        },
        type: common_1.EVENTTYPES.DOM
    });
    replace_1.addReplaceHandler({
        callback: function (e) {
            handleEvents_1.HandleEvents.handleHashchange(e);
        },
        type: common_1.EVENTTYPES.HASHCHANGE
    });
}
exports.setupReplace = setupReplace;
//# sourceMappingURL=load.js.map