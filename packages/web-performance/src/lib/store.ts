import { IMetrics, IMetricsObj, IReportHandler } from '../types'
import { metricsName } from '../constants'

/**
 * store metrics
 *
 * @class
 * */
class metricsStore {
  state: Map<metricsName | string, IMetrics>
  report: IReportHandler

  constructor(report) {
    this.state = new Map<metricsName | string, IMetrics>()
    this.report = report
  }

  set(key: metricsName | string, value: IMetrics) {
    this.state.set(key, value)
  }

  get(key: metricsName | string): IMetrics {
    return this.state.get(key)
  }

  has(key: metricsName | string): boolean {
    return this.state.has(key)
  }

  clear() {
    this.state.clear()
  }

  getValues(): IMetricsObj {
    return Array.from(this.state).reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
  }
}

export default metricsStore
