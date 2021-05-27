/*
 * Performance monitoring entry
 *
 * @class
 * @author allen(https://github.com/Chryseis)
 * */
import { IConfig, IWebVitals, IMetrics } from './types'
import generateUniqueID from './utils/generateUniqueID'
import { afterLoad, beforeUnload, unload } from './utils'
import { onHidden } from './lib/onHidden'
import createReporter from './lib/createReporter'
import MetricsStore from './lib/store'
import { measure } from './lib/measureCustomMetrics'
import { setMark, clearMark, getMark, hasMark } from './lib/markHandler'
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
    const { appId, version, reportCallback, reportUri = null, immediately = false, customCompleteEvent = null } = config
    this._customCompleteEvent = customCompleteEvent

    const sectionId = generateUniqueID()
    reporter = createReporter(sectionId, appId, version, reportCallback)
    metricsStore = new MetricsStore(reporter)

    afterLoad(() => {
      initPageInfo(metricsStore, reporter, immediately)
      initNetworkInfo(metricsStore, reporter, immediately)
      initDeviceInfo(metricsStore, reporter, immediately)
    })

    initNavigationTiming(metricsStore, reporter, immediately)
    initFP(metricsStore, reporter, immediately)
    initFCP(metricsStore, reporter, immediately)
    initFID(metricsStore, reporter, immediately)
    initLCP(metricsStore, reporter, immediately)
    initResourceFlow(metricsStore, reporter, customCompleteEvent, immediately)

    // report metrics when visibility and unload
    ;[beforeUnload, unload, onHidden].forEach((fn) => {
      fn(() => {
        const metrics = this.getCurrentMetrics()
        if ('sendBeacon' in navigator && reportUri && metrics.length > 0 && !immediately) {
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

  setStartMark(markName: string) {
    setMark(`${markName}_start`)
  }

  setEndMark(markName: string) {
    setMark(`${markName}_end`)

    if (hasMark(`${markName}_start`)) {
      const metrics = measure(`${markName}Metrics`, markName)
      this.clearMark(markName)

      reporter({ name: `${markName}Metrics`, value: metrics })
    } else {
      console.log('markName is not exist')
    }
  }

  clearMark(markName: string) {
    clearMark(`${markName}_start`)
    clearMark(`${markName}_end`)
  }

  customCompletePaint(customCompletePaintName: string) {
    setMark(customCompletePaintName)

    const metrics = getMark(customCompletePaintName)
    this.clearMark(customCompletePaintName)

    reporter({ name: 'customCompletePaint', value: metrics })
  }
}

export { WebVitals }
