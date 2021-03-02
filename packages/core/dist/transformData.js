"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceTransform = exports.httpTransform = void 0;
var common_1 = require("@mito/common");
var utils_1 = require("@mito/utils");
var errorId_1 = require("./errorId");
function httpTransform(data) {
    var message = '';
    var elapsedTime = data.elapsedTime, time = data.time, method = data.method, traceId = data.traceId, type = data.type, status = data.status;
    var name = type + "--" + method;
    if (status === 0) {
        message = elapsedTime <= common_1.globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时';
    }
    else {
        message = utils_1.fromHttpStatus(status);
    }
    message = message === utils_1.SpanStatus.Ok ? message : message + " " + errorId_1.getRealPath(data.url);
    return {
        type: common_1.ERRORTYPES.FETCH_ERROR,
        url: utils_1.getLocationHref(),
        time: time,
        elapsedTime: elapsedTime,
        level: utils_1.Severity.Low,
        message: message,
        name: name,
        request: {
            httpType: type,
            traceId: traceId,
            method: method,
            url: data.url,
            data: data.reqData || ''
        },
        response: {
            status: status,
            data: data.responseText
        }
    };
}
exports.httpTransform = httpTransform;
var resourceMap = {
    img: '图片',
    script: 'js脚本'
};
function resourceTransform(target) {
    return {
        type: common_1.ERRORTYPES.RESOURCE_ERROR,
        url: utils_1.getLocationHref(),
        message: '资源地址: ' + (target.src.slice(0, 100) || target.href.slice(0, 100)),
        level: utils_1.Severity.Low,
        time: utils_1.getTimestamp(),
        name: (resourceMap[target.localName] || target.localName) + "\u52A0\u8F7D\u5931\u8D25"
    };
}
exports.resourceTransform = resourceTransform;
//# sourceMappingURL=transformData.js.map