import { voidFun } from '../common/constant';
export declare class Queue {
    private micro;
    private stack;
    private isFlushing;
    constructor();
    addFn(fn: voidFun): void;
    getStack(): any[];
    flushStack(): void;
}
