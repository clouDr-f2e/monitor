"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsHistory = exports.getGlobalMitoSupport = exports.getFlag = exports.setFlag = exports._support = exports._global = exports.getGlobal = exports.isBrowserEnv = exports.isWxMiniEnv = exports.isNodeEnv = void 0;
var is_1 = require("./is");
exports.isNodeEnv = is_1.variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
exports.isWxMiniEnv = is_1.variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) && is_1.variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
exports.isBrowserEnv = is_1.variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
function getGlobal() {
    if (exports.isBrowserEnv)
        return window;
    if (exports.isWxMiniEnv)
        return wx;
    if (exports.isNodeEnv)
        return process;
}
exports.getGlobal = getGlobal;
var _global = getGlobal();
exports._global = _global;
var _support = getGlobalMitoSupport();
exports._support = _support;
_support.replaceFlag = _support.replaceFlag || {};
var replaceFlag = _support.replaceFlag;
function setFlag(replaceType, isSet) {
    if (replaceFlag[replaceType])
        return;
    replaceFlag[replaceType] = isSet;
}
exports.setFlag = setFlag;
function getFlag(replaceType) {
    return replaceFlag[replaceType] ? true : false;
}
exports.getFlag = getFlag;
function getGlobalMitoSupport() {
    _global.__MITO__ = _global.__MITO__ || {};
    return _global.__MITO__;
}
exports.getGlobalMitoSupport = getGlobalMitoSupport;
function supportsHistory() {
    var chrome = _global.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}
exports.supportsHistory = supportsHistory;
//# sourceMappingURL=global.js.map