import { voidFun } from '@mito/shared';
export declare class Queue {
    private micro;
    private stack;
    private isFlushing;
    constructor();
    addFn(fn: voidFun): void;
    clear(): void;
    getStack(): any[];
    flushStack(): void;
}
