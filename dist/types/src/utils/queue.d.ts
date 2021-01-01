import { voidFun } from '../common/common';
export declare class Queue {
    private micro;
    private stack;
    private isFlushing;
    constructor();
    addFn(fn: voidFun): void;
    flushStack(): void;
}
