import { breadcrumb, transportData, options as coreOptions } from '@mito/core';
import { setSilentFlag, logger } from '@mito/utils';
export function initOptions(options) {
    if (options === void 0) { options = {}; }
    setSilentFlag(options);
    breadcrumb.bindOptions(options);
    logger.bindOptions(options.debug);
    transportData.bindOptions(options);
    coreOptions.bindOptions(options);
}
//# sourceMappingURL=initOpitons.js.map