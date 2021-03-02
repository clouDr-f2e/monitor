"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOptions = void 0;
var core_1 = require("@mito/core");
var utils_1 = require("@mito/utils");
function initOptions(options) {
    if (options === void 0) { options = {}; }
    utils_1.setSilentFlag(options);
    core_1.breadcrumb.bindOptions(options);
    utils_1.logger.bindOptions(options.debug);
    core_1.transportData.bindOptions(options);
    core_1.options.bindOptions(options);
}
exports.initOptions = initOptions;
//# sourceMappingURL=initOpitons.js.map