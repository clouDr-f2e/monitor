import { variableTypeDetection } from './is';
export var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
export var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) && variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
export var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
export function getGlobal() {
    if (isBrowserEnv)
        return window;
    if (isWxMiniEnv)
        return wx;
    if (isNodeEnv)
        return process;
}
var _global = getGlobal();
var _support = getGlobalMitoSupport();
export { _global, _support };
_support.replaceFlag = _support.replaceFlag || {};
var replaceFlag = _support.replaceFlag;
export function setFlag(replaceType, isSet) {
    if (replaceFlag[replaceType])
        return;
    replaceFlag[replaceType] = isSet;
}
export function getFlag(replaceType) {
    return replaceFlag[replaceType] ? true : false;
}
export function getGlobalMitoSupport() {
    _global.__MITO__ = _global.__MITO__ || {};
    return _global.__MITO__;
}
export function supportsHistory() {
    var chrome = _global.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}
//# sourceMappingURL=global.js.map