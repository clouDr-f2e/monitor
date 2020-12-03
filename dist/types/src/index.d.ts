import { log } from './core/index';
import { InitOptions } from './types/index';
declare function init(options?: InitOptions): void;
declare const _default: {
    MitoVue: {
        install(Vue: import("./Vue/types").VueInstance): void;
    };
    SDK_VERSION: string;
    SDK_NAME: string;
    init: typeof init;
    log: typeof log;
};
export default _default;
