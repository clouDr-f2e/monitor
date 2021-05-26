/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals, IMetrics } from './types'
import generateUniqueID from './utils/generateUniqueID'
import { afterLoad, beforeUnload } from './utils'
import { onHidden } from './lib/onHidden'
import createReporter from './lib/createReporter'
import MetricsStore from './lib/store'
import { initNavigationTiming } from './metrics/getNavigationTiming'
import { initDeviceInfo } from './metrics/getDeviceInfo'
import { initNetworkInfo } from './metrics/getNetworkInfo'
import { initPageInfo } from './metrics/getPageInfo'
import { initFP } from './metrics/getFP'
import { initFCP } from './metrics/getFCP'
import { initFID } from './metrics/getFID'
import { initLCP } from './metrics/getLCP'
import { initResourceFlow } from './metrics/getResourceFlow'

let metricsStore: MetricsStore
let reporter: ReturnType<typeof createReporter>

class WebVitals implements IWebVitals {
  _customCompleteEvent: string

  constructor(config: IConfig) {
    const { projectName, version, reportCallback, reportUri = null, immediately = false, customCompleteEvent = null } = config
    this._customCompleteEvent = customCompleteEvent

    const sectionId = generateUniqueID(projectName, version)
    reporter = createReporter(sectionId, reportCallback)
    metricsStore = new MetricsStore(reporter)

    afterLoad(() => {
      initPageInfo(metricsStore, reporter, immediately)
      initNetworkInfo(metricsStore, reporter, immediately)
      initNavigationTiming(metricsStore, reporter, immediately)
      initDeviceInfo(metricsStore, reporter, immediately)
    })

    initFP(metricsStore, reporter, immediately)
    initFCP(metricsStore, reporter, immediately)
    initFID(metricsStore, reporter, immediately)
    initLCP(metricsStore, reporter, immediately)
    initResourceFlow(metricsStore, reporter, customCompleteEvent, immediately)

    // report metrics when visibility and unload
    ;[beforeUnload, onHidden].forEach((fn) => {
      fn(() => {
        const metrics = this.getCurrentMetrics()
        if ('sendBeacon' in navigator && reportUri && metrics.length > 0) {
          navigator.sendBeacon(reportUri, JSON.stringify(metrics))
        }
      })
    })
  }

  getCurrentMetrics(): Array<IMetrics> {
    return metricsStore.getValues()
  }

  dispatchCustomEvent(): void {
    const event = document.createEvent('Events')
    const customCompleteEvent = this._customCompleteEvent
    event.initEvent(customCompleteEvent, false, true)
    document.dispatchEvent(event)
  }

  setStartMark(markName: string) {}

  setEndMark(markName: string) {}

  clearMark(markName: string) {}

  customPaintComplete() {}
}

export { WebVitals }
