"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppId = void 0;
function getAppId() {
    return wx.getAccountInfoSync().miniProgram.appId;
}
exports.getAppId = getAppId;
//# sourceMappingURL=mini.js.map