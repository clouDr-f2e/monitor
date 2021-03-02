export * from './handleEvents';
export * from './load';
export * from './replace';
import { log } from '@mito/core';
import { SDK_VERSION, SDK_NAME } from '@mito/common';
import { InitOptions } from '@mito/types';
declare function init(options?: InitOptions): void;
export { SDK_VERSION, SDK_NAME, init, log };
//# sourceMappingURL=index.d.ts.map