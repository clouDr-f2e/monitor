export * from './handleEvents';
export * from './load';
export * from './replace';
import { setupReplace } from './load';
import { log } from '@mito/core';
import { _global } from '@mito/utils';
import { SDK_VERSION, SDK_NAME, initOptions } from '@mito/common';
function webInit(options) {
    if (options === void 0) { options = {}; }
    if (!('XMLHttpRequest' in _global) || options.disabled)
        return;
    initOptions(options);
    setupReplace();
}
function init(options) {
    if (options === void 0) { options = {}; }
    webInit(options);
}
export { SDK_VERSION, SDK_NAME, init, log };
//# sourceMappingURL=index.js.map