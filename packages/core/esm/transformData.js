import { ERRORTYPES, globalVar } from '@mito/common';
import { getLocationHref, getTimestamp, Severity, fromHttpStatus, SpanStatus } from '@mito/utils';
import { getRealPath } from './errorId';
export function httpTransform(data) {
    var message = '';
    var elapsedTime = data.elapsedTime, time = data.time, method = data.method, traceId = data.traceId, type = data.type, status = data.status;
    var name = type + "--" + method;
    if (status === 0) {
        message = elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时';
    }
    else {
        message = fromHttpStatus(status);
    }
    message = message === SpanStatus.Ok ? message : message + " " + getRealPath(data.url);
    return {
        type: ERRORTYPES.FETCH_ERROR,
        url: getLocationHref(),
        time: time,
        elapsedTime: elapsedTime,
        level: Severity.Low,
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
var resourceMap = {
    img: '图片',
    script: 'js脚本'
};
export function resourceTransform(target) {
    return {
        type: ERRORTYPES.RESOURCE_ERROR,
        url: getLocationHref(),
        message: '资源地址: ' + (target.src.slice(0, 100) || target.href.slice(0, 100)),
        level: Severity.Low,
        time: getTimestamp(),
        name: (resourceMap[target.localName] || target.localName) + "\u52A0\u8F7D\u5931\u8D25"
    };
}
//# sourceMappingURL=transformData.js.map