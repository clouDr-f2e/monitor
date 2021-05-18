/*
 * @author allen(https://github.com/Chryseis)
 * Device Info
 * deviceMemory,the deviceMemory read-only property of the Navigator interface returns the approximate amount of device memory in gigabytes.
 * hardwareConcurrency,the navigator.hardwareConcurrency read-only property returns the number of logical processors available to run threads on the user's computer.
 * jsHeapSizeLimit,the maximum size of the heap, in bytes, that is available to the context.
 * totalJSHeapSize,the total allocated heap size, in bytes.
 * usedJSHeapSize,the currently active segment of JS heap, in bytes.
 * fps,a frame rate is the speed at which the browser is able to recalculate, layout and paint content to the display.
 * userAgent,a user agent is a computer program representing a person, for example, a browser in a Web context.
 * */
import { IDeviceInformation, IMetrics, IReportHandler } from '../types'
import { isPerformanceSupported, isNavigatorSupported } from '../utils/isSupported'
import calculateFps from '../utils/calculateFps'
import { convertToMB } from '../utils'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'

const getDeviceInfo = (): IDeviceInformation => {
  if (!isPerformanceSupported()) {
    console.error('browser do not support performance')
    return
  }

  if (!isNavigatorSupported()) {
    console.error('browser do not support navigator')
    return
  }

  return {
    deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
    hardwareConcurrency: 'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
    jsHeapSizeLimit: 'memory' in performance ? convertToMB(performance['memory']['jsHeapSizeLimit']) : 0,
    totalJSHeapSize: 'memory' in performance ? convertToMB(performance['memory']['totalJSHeapSize']) : 0,
    usedJSHeapSize: 'memory' in performance ? convertToMB(performance['memory']['usedJSHeapSize']) : 0,
    fps: calculateFps(),
    userAgent: 'userAgent' in navigator ? navigator.userAgent : ''
  }
}

/*
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initDeviceInfo = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  const deviceInfo: IDeviceInformation = getDeviceInfo()

  const metrics = { name: metricsName.DI, value: deviceInfo } as IMetrics

  if (immediately) {
    report(metrics)
  }

  store.set(metricsName.DI, metrics)
}
