import { IMetrics } from '../types'
import { metricsName } from '../constants'

/*
 * store metrics
 *
 * @class
 * */
class metricsStore {
  state: Map<metricsName, IMetrics>

  constructor() {
    this.state = new Map<metricsName, IMetrics>()
  }

  set(key: metricsName, value: IMetrics) {
    this.state.set(key, value)
  }

  get(key: metricsName): IMetrics {
    return this.state.get(key)
  }

  has(key: metricsName) {
    return this.state.has(key)
  }
}

export default new metricsStore()
