"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeTryCatch = void 0;
function nativeTryCatch(fn, errorFn) {
    try {
        fn();
    }
    catch (err) {
        console.log('err', err);
        if (errorFn) {
            errorFn(err);
        }
    }
}
exports.nativeTryCatch = nativeTryCatch;
//# sourceMappingURL=exception.js.map