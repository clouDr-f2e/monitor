"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var common_1 = require("@mito/common");
var utils_1 = require("@mito/utils");
var load_1 = require("./load");
var core_1 = require("@mito/core");
function init(options) {
    if (options === void 0) { options = {}; }
    if (!utils_1.isWxMiniEnv)
        return;
    common_1.initOptions(options);
    load_1.setupReplace();
    Object.assign(wx, { mitoLog: core_1.log });
}
exports.init = init;
//# sourceMappingURL=index.js.map