import { HandleEvents } from './handleEvents';
import { htmlElementAsString, Severity } from '@mito/utils';
import { EVENTTYPES, BREADCRUMBTYPES, handleConsole } from '@mito/common';
import { breadcrumb } from '@mito/core';
import { addReplaceHandler } from './replace';
export function setupReplace() {
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleHttp(data, BREADCRUMBTYPES.XHR);
        },
        type: EVENTTYPES.XHR
    });
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleHttp(data, BREADCRUMBTYPES.FETCH);
        },
        type: EVENTTYPES.FETCH
    });
    addReplaceHandler({
        callback: function (error) {
            HandleEvents.handleError(error);
        },
        type: EVENTTYPES.ERROR
    });
    addReplaceHandler({
        callback: function (data) {
            handleConsole(data);
        },
        type: EVENTTYPES.CONSOLE
    });
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleHistory(data);
        },
        type: EVENTTYPES.HISTORY
    });
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleUnhandleRejection(data);
        },
        type: EVENTTYPES.UNHANDLEDREJECTION
    });
    addReplaceHandler({
        callback: function (data) {
            var htmlString = htmlElementAsString(data.data.activeElement);
            if (htmlString) {
                breadcrumb.push({
                    type: BREADCRUMBTYPES.CLICK,
                    category: breadcrumb.getCategory(BREADCRUMBTYPES.CLICK),
                    data: htmlString,
                    level: Severity.Info
                });
            }
        },
        type: EVENTTYPES.DOM
    });
    addReplaceHandler({
        callback: function (e) {
            HandleEvents.handleHashchange(e);
        },
        type: EVENTTYPES.HASHCHANGE
    });
}
//# sourceMappingURL=load.js.map