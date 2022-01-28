import { metricsName } from '../constants'

const config: Record<string, any> = {
  [metricsName.FP]: {
    median: 3000,
    p10: 1800
  },
  [metricsName.FCP]: {
    median: 3000,
    p10: 1800
  },
  [metricsName.ACT]: {
    median: 3500,
    p10: 2300
  },
  [metricsName.LCP]: {
    median: 4000,
    p10: 2500
  },
  [metricsName.CCP]: {
    median: 4000,
    p10: 2500
  },
  [metricsName.FID]: {
    median: 300,
    p10: 100
  },
  [metricsName.CLS]: {
    median: 0.25,
    p10: 0.1
  }
}

export default config
