import { QUANTILE_AT_VALUE } from '../utils/math'
import scoreDefaultConfig from '../config/scoreDefaultConfig'
import { IScoreConfig } from '../types'

/**
 * @param metricsName string
 * @param value number
 * @param config IScoreConfig
 * @return the metrics score
 **/
const calcScore = (metricsName: string, value: number, config: IScoreConfig = {}): number | null => {
  const mergeConfig = { ...scoreDefaultConfig, ...config }

  const metricsConfig = mergeConfig[metricsName]

  if (metricsConfig) {
    return QUANTILE_AT_VALUE(metricsConfig, value)
  }

  return null
}

export default calcScore
