"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.init = exports.SDK_NAME = exports.SDK_VERSION = void 0;
__exportStar(require("./handleEvents"), exports);
__exportStar(require("./load"), exports);
__exportStar(require("./replace"), exports);
var load_1 = require("./load");
var core_1 = require("@mito/core");
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return core_1.log; } });
var utils_1 = require("@mito/utils");
var common_1 = require("@mito/common");
Object.defineProperty(exports, "SDK_VERSION", { enumerable: true, get: function () { return common_1.SDK_VERSION; } });
Object.defineProperty(exports, "SDK_NAME", { enumerable: true, get: function () { return common_1.SDK_NAME; } });
function webInit(options) {
    if (options === void 0) { options = {}; }
    if (!('XMLHttpRequest' in utils_1._global) || options.disabled)
        return;
    common_1.initOptions(options);
    load_1.setupReplace();
}
function init(options) {
    if (options === void 0) { options = {}; }
    webInit(options);
}
exports.init = init;
//# sourceMappingURL=index.js.map