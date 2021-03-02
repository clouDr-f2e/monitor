"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractErrorStack = exports.setSilentFlag = exports.parseUrlToObj = exports.htmlElementAsString = void 0;
var common_1 = require("@mito/common");
var helpers_1 = require("./helpers");
var global_1 = require("./global");
function htmlElementAsString(target) {
    var tagName = target.tagName.toLowerCase();
    if (tagName === 'body') {
        return null;
    }
    var classNames = target.classList.value;
    classNames = classNames !== '' ? " class=\"" + classNames + "\"" : '';
    var id = target.id ? " id=\"" + target.id + "\"" : '';
    var innerText = target.innerText;
    return "<" + tagName + id + (classNames !== '' ? classNames : '') + ">" + innerText + "</" + tagName + ">";
}
exports.htmlElementAsString = htmlElementAsString;
function parseUrlToObj(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment
    };
}
exports.parseUrlToObj = parseUrlToObj;
function setSilentFlag(opitons) {
    if (opitons === void 0) { opitons = {}; }
    global_1.setFlag(common_1.EVENTTYPES.XHR, !!opitons.silentXhr);
    global_1.setFlag(common_1.EVENTTYPES.FETCH, !!opitons.silentFetch);
    global_1.setFlag(common_1.EVENTTYPES.CONSOLE, !!opitons.silentConsole);
    global_1.setFlag(common_1.EVENTTYPES.DOM, !!opitons.silentDom);
    global_1.setFlag(common_1.EVENTTYPES.HISTORY, !!opitons.silentHistory);
    global_1.setFlag(common_1.EVENTTYPES.ERROR, !!opitons.silentError);
    global_1.setFlag(common_1.EVENTTYPES.HASHCHANGE, !!opitons.silentHashchange);
    global_1.setFlag(common_1.EVENTTYPES.UNHANDLEDREJECTION, !!opitons.silentUnhandledrejection);
    global_1.setFlag(common_1.EVENTTYPES.VUE, !!opitons.silentVue);
    global_1.setFlag(common_1.WxAppEvents.AppOnError, !!opitons.silentWxOnError);
    global_1.setFlag(common_1.WxAppEvents.AppOnUnhandledRejection, !!opitons.silentUnhandledrejection);
    global_1.setFlag(common_1.WxAppEvents.AppOnPageNotFound, !!opitons.silentWxOnPageNotFound);
    global_1.setFlag(common_1.WxPageEvents.PageOnShareAppMessage, !!opitons.silentWxOnShareAppMessage);
    global_1.setFlag(common_1.EVENTTYPES.MINI_ROUTE, !!opitons.silentMiniRoute);
}
exports.setSilentFlag = setSilentFlag;
function extractErrorStack(ex, level) {
    var normal = {
        time: helpers_1.getTimestamp(),
        url: helpers_1.getLocationHref(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || common_1.ERRORTYPES.UNKNOWN_FUNCTION,
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || common_1.ERRORTYPES.UNKNOWN_FUNCTION,
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || common_1.ERRORTYPES.UNKNOWN_FUNCTION,
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = common_1.ERRORTYPES.UNKNOWN_FUNCTION;
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}
exports.extractErrorStack = extractErrorStack;
//# sourceMappingURL=browser.js.map