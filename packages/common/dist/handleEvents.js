"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConsole = void 0;
var core_1 = require("@mito/core");
var utils_1 = require("@mito/utils");
var constant_1 = require("./constant");
function handleConsole(data) {
    if (constant_1.globalVar.isLogAddBreadcrumb) {
        core_1.breadcrumb.push({
            type: constant_1.BREADCRUMBTYPES.CONSOLE,
            category: core_1.breadcrumb.getCategory(constant_1.BREADCRUMBTYPES.CONSOLE),
            data: data,
            level: utils_1.Severity.fromString(data.level)
        });
    }
}
exports.handleConsole = handleConsole;
//# sourceMappingURL=handleEvents.js.map