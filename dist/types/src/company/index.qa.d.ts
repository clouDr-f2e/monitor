declare const _default: {
    MitoVue: {
        install(Vue: import("../Vue/types").VueInstance): void;
    };
    SDK_VERSION: string;
    SDK_NAME: string;
    log: (...args: any[]) => void;
    errorBoundaryReport: typeof import("../React").errorBoundaryReport;
};
export default _default;
