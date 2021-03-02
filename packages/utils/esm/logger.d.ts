export declare class Logger {
    private enabled;
    private _console;
    constructor();
    disable(): void;
    bindOptions(debug: boolean): void;
    enable(): void;
    getEnableStatus(): boolean;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
declare const logger: Logger;
export { logger };
//# sourceMappingURL=logger.d.ts.map