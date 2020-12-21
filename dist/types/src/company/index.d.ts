import { InitOptions } from '../types/index';
import { errorBoundaryReport } from 'React/index';
declare function init(options?: InitOptions): void;
declare function log(...args: any[]): void;
declare const _default: {
    MitoVue: {
        install(Vue: import("../Vue/types").VueInstance): void;
    };
    SDK_VERSION: string;
    SDK_NAME: string;
    init: typeof init;
    log: typeof log;
    errorBoundaryReport: typeof errorBoundaryReport;
};
export default _default;
