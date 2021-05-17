import { IMetrics } from '../types'

/*
 * store metrics
 *
 * @class
 * */
class metricsStore {
  state: Map<string, IMetrics>

  constructor() {
    this.state = new Map<string, IMetrics>()
  }

  set(key, value: IMetrics) {
    this.state.set(key, value)
  }

  get(key): IMetrics {
    return this.state.get(key)
  }

  has(key) {
    return this.state.has(key)
  }
}

export default new metricsStore()
