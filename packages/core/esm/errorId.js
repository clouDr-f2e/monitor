import { getAppId, isWxMiniEnv, variableTypeDetection } from '@mito/utils';
import { ERRORTYPES, EVENTTYPES } from '@mito/common';
var allErrorNumber = {};
export function createErrorId(data, apikey) {
    var id;
    switch (data.type) {
        case ERRORTYPES.FETCH_ERROR:
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey;
            break;
        case ERRORTYPES.JAVASCRIPT_ERROR:
        case ERRORTYPES.VUE_ERROR:
        case ERRORTYPES.REACT_ERROR:
            id = data.type + data.name + data.message + apikey;
            break;
        case ERRORTYPES.LOG_ERROR:
            id = data.customTag + data.type + data.name + apikey;
            break;
        case ERRORTYPES.PROMISE_ERROR:
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
function generatePromiseErrorId(data, apikey) {
    var locationUrl = getRealPath(data.url);
    if (data.name === EVENTTYPES.UNHANDLEDREJECTION) {
        return data.type + objectOrder(data.message) + apikey;
    }
    return data.type + data.name + objectOrder(data.message) + locationUrl;
}
function objectOrder(reason) {
    var sortFn = function (obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (total, key) {
            if (variableTypeDetection.isObject(obj[key])) {
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
export function getRealPath(url) {
    return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
}
export function getFlutterRealOrigin(url) {
    return removeHashPath(getFlutterRealPath(url));
}
export function getFlutterRealPath(url) {
    return url.replace(/(\S+)(\/Documents\/)(\S*)/, "$3");
}
export function getRealPageOrigin(url) {
    var fileStartReg = /^file:\/\//;
    if (fileStartReg.test(url)) {
        return getFlutterRealOrigin(url);
    }
    if (isWxMiniEnv) {
        return getAppId();
    }
    return getRealPath(removeHashPath(url).replace(/(\S*)(\/\/)(\S+)/, '$3'));
}
export function removeHashPath(url) {
    return url.replace(/(\S+)(\/#\/)(\S*)/, "$1");
}
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