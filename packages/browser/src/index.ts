export * from './handleEvents'
export * from './load'
export * from './replace'
import { setupReplace } from './load'
import { initOptions, log } from '@mitojs/core'
import { _global } from '@mitojs/utils'
import { SDK_VERSION, SDK_NAME } from '@mitojs/shared'
import { InitOptions } from '@mitojs/types'
import tracePerf from '@mitojs/performance';

const performance = (configs: any) => {
  // trace and report perf data and pv to serve when page loaded
  if (document.readyState === 'complete') {
    tracePerf.recordPerf(configs);
  } else {
    window.addEventListener(
      'load',
      () => {
        tracePerf.recordPerf(configs);
      },
      false,
    );
  }
  if (configs.enableSPA) {
    // hash router
    window.addEventListener(
      'hashchange',
      () => {
        tracePerf.recordPerf(configs);
      },
      false,
    );
  }
}

function webInit(options: InitOptions = {}): void {
  if (!('XMLHttpRequest' in _global) || options.disabled) return
  initOptions(options)
  performance(options)
  setupReplace()
}

function init(options: InitOptions = {}): void {
  webInit(options)
}

export { SDK_VERSION, SDK_NAME, init, log }
