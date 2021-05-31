/**
 * @author allen(https://github.com/Chryseis)
 * FPS
 * fps,a frame rate is the speed at which the browser is able to recalculate, layout and paint content to the display.
 * */
import { IReportHandler } from '../types'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'
import calculateFps from '../lib/calculateFps'

const getFPS = (): Promise<number> => {
  return calculateFps(5)
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initFPS = (store: metricsStore, report: IReportHandler, immediately: boolean = true): void => {
  getFPS().then((fps: number) => {
    const metrics = { name: metricsName.FPS, value: fps }

    if (immediately) {
      report(metrics)
    }

    store.set(metricsName.FPS, metrics)
  })
}
