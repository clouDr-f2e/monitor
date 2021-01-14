import { InitOptions } from '../types/options';
import { log } from '../core/index';
declare function init(options?: InitOptions): void;
declare const _default: {
    init: typeof init;
    log: typeof log;
    SDK_VERSION: string;
    SDK_NAME: string;
};
export default _default;
