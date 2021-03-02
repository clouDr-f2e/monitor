"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupReplace = void 0;
var common_1 = require("@mito/common");
var handleWxEvents_1 = require("./handleWxEvents");
var replace_1 = require("./replace");
function setupReplace() {
    replace_1.replaceApp();
    replace_1.replacePage();
    replace_1.replaceComponent();
    replace_1.replaceBehavior();
    replace_1.addReplaceHandler({
        callback: function (data) { return handleWxEvents_1.HandleWxEvents.handleRoute(data); },
        type: common_1.EVENTTYPES.MINI_ROUTE
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleWxEvents_1.HandleNetworkEvents.handleRequest(data);
        },
        type: common_1.EVENTTYPES.XHR
    });
    replace_1.addReplaceHandler({
        callback: function (data) {
            handleWxEvents_1.HandleWxConsoleEvents.console(data);
        },
        type: common_1.EVENTTYPES.CONSOLE
    });
    replace_1.addReplaceHandler({
        callback: function (data) { return handleWxEvents_1.HandleWxPageEvents.onAction(data); },
        type: common_1.EVENTTYPES.DOM
    });
}
exports.setupReplace = setupReplace;
//# sourceMappingURL=load.js.map