"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrorString = exports.setUrlQuery = exports.isHttpFail = exports.getBigVersion = exports.unknownToString = exports.generateUUID = exports.slientConsoleScope = exports.toStringValidateOption = exports.validateOption = exports.toStringAny = exports.typeofAny = exports.getTimestamp = exports.throttle = exports.getFunctionName = exports.defaultFunctionName = exports.replaceOld = exports.on = exports.getLocationHref = void 0;
var common_1 = require("@mito/common");
var logger_1 = require("./logger");
var is_1 = require("./is");
function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
exports.getLocationHref = getLocationHref;
function on(target, eventName, handler, opitons) {
    if (opitons === void 0) { opitons = false; }
    target.addEventListener(eventName, handler, opitons);
}
exports.on = on;
function replaceOld(source, name, replacement, isForced) {
    if (isForced === void 0) { isForced = false; }
    if (name in source || isForced) {
        var original = source[name];
        var wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[name] = wrapped;
        }
    }
}
exports.replaceOld = replaceOld;
exports.defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return exports.defaultFunctionName;
    }
    return fn.name || exports.defaultFunctionName;
}
exports.getFunctionName = getFunctionName;
exports.throttle = function (fn, delay) {
    var canRun = true;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!canRun)
            return;
        fn.apply(this, args);
        canRun = false;
        setTimeout(function () {
            canRun = true;
        }, delay);
    };
};
function getTimestamp() {
    return Date.now();
}
exports.getTimestamp = getTimestamp;
function typeofAny(target, type) {
    return typeof target === type;
}
exports.typeofAny = typeofAny;
function toStringAny(target, type) {
    return is_1.nativeToString.call(target) === type;
}
exports.toStringAny = toStringAny;
function validateOption(target, targetName, expectType) {
    if (typeofAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger_1.logger.error(targetName + "\u671F\u671B\u4F20\u5165" + expectType + "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F" + typeof target + "\u7C7B\u578B");
    return false;
}
exports.validateOption = validateOption;
function toStringValidateOption(target, targetName, expectType) {
    if (toStringAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger_1.logger.error(targetName + "\u671F\u671B\u4F20\u5165" + expectType + "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F" + is_1.nativeToString.call(target) + "\u7C7B\u578B");
    return false;
}
exports.toStringValidateOption = toStringValidateOption;
function slientConsoleScope(callback) {
    common_1.globalVar.isLogAddBreadcrumb = false;
    callback();
    common_1.globalVar.isLogAddBreadcrumb = true;
}
exports.slientConsoleScope = slientConsoleScope;
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
exports.generateUUID = generateUUID;
function unknownToString(target) {
    if (is_1.variableTypeDetection.isString(target)) {
        return target;
    }
    if (is_1.variableTypeDetection.isUndefined(target)) {
        return 'undefined';
    }
    return JSON.stringify(target);
}
exports.unknownToString = unknownToString;
function getBigVersion(version) {
    return Number(version.split('.')[0]);
}
exports.getBigVersion = getBigVersion;
function isHttpFail(code) {
    return code === 0 || code === common_1.HTTP_CODE.BAD_REQUEST || code > common_1.HTTP_CODE.UNAUTHORIZED;
}
exports.isHttpFail = isHttpFail;
function setUrlQuery(url, query) {
    var queryArr = [];
    Object.keys(query).forEach(function (k) {
        queryArr.push(k + "=" + query[k]);
    });
    if (url.indexOf('?') !== -1) {
        url = url + "&" + queryArr.join('&');
    }
    else {
        url = url + "?" + queryArr.join('&');
    }
    return url;
}
exports.setUrlQuery = setUrlQuery;
function parseErrorString(str) {
    var splitLine = str.split('\n');
    if (splitLine.length < 2)
        return null;
    if (splitLine[0].indexOf('MiniProgramError') !== -1) {
        splitLine.splice(0, 1);
    }
    var message = splitLine.splice(0, 1)[0];
    var name = splitLine.splice(0, 1)[0].split(':')[0];
    var stacks = [];
    splitLine.forEach(function (errorLine) {
        var regexpGetFun = /at\s+([\S]+)\s+\(/;
        var regexGetFile = /\(([^)]+)\)/;
        var regexGetFileNoParenthese = /\s+at\s+(\S+)/;
        var funcExec = regexpGetFun.exec(errorLine);
        var fileURLExec = regexGetFile.exec(errorLine);
        if (!fileURLExec) {
            fileURLExec = regexGetFileNoParenthese.exec(errorLine);
        }
        var funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : '';
        var fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : '';
        var lineInfo = fileURLMatch.split(':');
        stacks.push({
            args: [],
            func: funcNameMatch || common_1.ERRORTYPES.UNKNOWN_FUNCTION,
            column: Number(lineInfo.pop()),
            line: Number(lineInfo.pop()),
            url: lineInfo.join(':')
        });
    });
    return {
        message: message,
        name: name,
        stacks: stacks
    };
}
exports.parseErrorString = parseErrorString;
//# sourceMappingURL=helpers.js.map