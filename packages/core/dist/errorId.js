"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHashPath = exports.getRealPageOrigin = exports.getFlutterRealPath = exports.getFlutterRealOrigin = exports.getRealPath = exports.createErrorId = void 0;
var utils_1 = require("@mito/utils");
var common_1 = require("@mito/common");
var allErrorNumber = {};
function createErrorId(data, apikey) {
    var id;
    switch (data.type) {
        case common_1.ERRORTYPES.FETCH_ERROR:
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey;
            break;
        case common_1.ERRORTYPES.JAVASCRIPT_ERROR:
        case common_1.ERRORTYPES.VUE_ERROR:
        case common_1.ERRORTYPES.REACT_ERROR:
            id = data.type + data.name + data.message + apikey;
            break;
        case common_1.ERRORTYPES.LOG_ERROR:
            id = data.customTag + data.type + data.name + apikey;
            break;
        case common_1.ERRORTYPES.PROMISE_ERROR:
            id = generatePromiseErrorId(data, apikey);
            break;
        default:
            id = data.type + data.message + apikey;
            break;
    }
    id = hashCode(id);
    if (allErrorNumber[id] > 1) {
        return null;
    }
    if (typeof allErrorNumber[id] === 'number') {
        allErrorNumber[id]++;
    }
    else {
        allErrorNumber[id] = 1;
    }
    return id;
}
exports.createErrorId = createErrorId;
function generatePromiseErrorId(data, apikey) {
    var locationUrl = getRealPath(data.url);
    if (data.name === common_1.EVENTTYPES.UNHANDLEDREJECTION) {
        return data.type + objectOrder(data.message) + apikey;
    }
    return data.type + data.name + objectOrder(data.message) + locationUrl;
}
function objectOrder(reason) {
    var sortFn = function (obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (total, key) {
            if (utils_1.variableTypeDetection.isObject(obj[key])) {
                total[key] = sortFn(obj[key]);
            }
            else {
                total[key] = obj[key];
            }
            return total;
        }, {});
    };
    try {
        if (/\{.*\}/.test(reason)) {
            var obj = JSON.parse(reason);
            obj = sortFn(obj);
            return JSON.stringify(obj);
        }
    }
    catch (error) {
        return reason;
    }
}
function getRealPath(url) {
    return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
}
exports.getRealPath = getRealPath;
function getFlutterRealOrigin(url) {
    return removeHashPath(getFlutterRealPath(url));
}
exports.getFlutterRealOrigin = getFlutterRealOrigin;
function getFlutterRealPath(url) {
    return url.replace(/(\S+)(\/Documents\/)(\S*)/, "$3");
}
exports.getFlutterRealPath = getFlutterRealPath;
function getRealPageOrigin(url) {
    var fileStartReg = /^file:\/\//;
    if (fileStartReg.test(url)) {
        return getFlutterRealOrigin(url);
    }
    if (utils_1.isWxMiniEnv) {
        return utils_1.getAppId();
    }
    return getRealPath(removeHashPath(url).replace(/(\S*)(\/\/)(\S+)/, '$3'));
}
exports.getRealPageOrigin = getRealPageOrigin;
function removeHashPath(url) {
    return url.replace(/(\S+)(\/#\/)(\S*)/, "$1");
}
exports.removeHashPath = removeHashPath;
function hashCode(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}
//# sourceMappingURL=errorId.js.map