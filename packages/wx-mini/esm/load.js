import { EVENTTYPES } from '@mito/common';
import { HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents, HandleWxPageEvents } from './handleWxEvents';
import { addReplaceHandler, replaceApp, replacePage, replaceComponent, replaceBehavior } from './replace';
export function setupReplace() {
    replaceApp();
    replacePage();
    replaceComponent();
    replaceBehavior();
    addReplaceHandler({
        callback: function (data) { return HandleWxEvents.handleRoute(data); },
        type: EVENTTYPES.MINI_ROUTE
    });
    addReplaceHandler({
        callback: function (data) {
            HandleNetworkEvents.handleRequest(data);
        },
        type: EVENTTYPES.XHR
    });
    addReplaceHandler({
        callback: function (data) {
            HandleWxConsoleEvents.console(data);
        },
        type: EVENTTYPES.CONSOLE
    });
    addReplaceHandler({
        callback: function (data) { return HandleWxPageEvents.onAction(data); },
        type: EVENTTYPES.DOM
    });
}
//# sourceMappingURL=load.js.map