import { initOptions } from '@mito/common';
import { isWxMiniEnv } from '@mito/utils';
import { setupReplace } from './load';
import { log } from '@mito/core';
export function init(options) {
    if (options === void 0) { options = {}; }
    if (!isWxMiniEnv)
        return;
    initOptions(options);
    setupReplace();
    Object.assign(wx, { mitoLog: log });
}
//# sourceMappingURL=index.js.map