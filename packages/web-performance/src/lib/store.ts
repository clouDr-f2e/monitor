import { IMetrics, IReportHandler } from '../types'
import { metricsName } from '../constants'

/*
 * store metrics
 *
 * @class
 * */
class metricsStore {
  state: Map<metricsName | string, IMetrics>
  report: IReportHandler

  constructor(report) {
    this.state = new Map<metricsName, IMetrics>()
    this.report = report
  }

  set(key: metricsName, value: IMetrics) {
    this.state.set(key, value)
  }

  get(key: metricsName): IMetrics {
    return this.state.get(key)
  }

  has(key: metricsName): boolean {
    return this.state.has(key)
  }

  clear() {
    this.state.clear()
  }

  getValues(): Array<IMetrics> {
    return Array.from(this.state.values())
  }
}

export default metricsStore
