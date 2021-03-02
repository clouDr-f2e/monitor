"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExistProperty = exports.isInstanceOf = exports.isEmpty = exports.isEmptyObject = exports.isError = exports.variableTypeDetection = exports.nativeToString = void 0;
exports.nativeToString = Object.prototype.toString;
function isType(type) {
    return function (value) {
        return exports.nativeToString.call(value) === "[object " + type + "]";
    };
}
exports.variableTypeDetection = {
    isNumber: isType('Number'),
    isString: isType('String'),
    isBoolean: isType('Boolean'),
    isNull: isType('Null'),
    isUndefined: isType('Undefined'),
    isSymbol: isType('Symbol'),
    isFunction: isType('Function'),
    isObject: isType('Object'),
    isArray: isType('Array'),
    isProcess: isType('process'),
    isWindow: isType('Window')
};
function isError(wat) {
    switch (exports.nativeToString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
exports.isError = isError;
function isEmptyObject(obj) {
    return exports.variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0;
}
exports.isEmptyObject = isEmptyObject;
function isEmpty(wat) {
    return (exports.variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null;
}
exports.isEmpty = isEmpty;
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}
exports.isInstanceOf = isInstanceOf;
function isExistProperty(obj, key) {
    return obj.hasOwnProperty(key);
}
exports.isExistProperty = isExistProperty;
//# sourceMappingURL=is.js.map