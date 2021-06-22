/**
 * @author allen(https://github.com/Chryseis)
 * Network Info
 * downlink,returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds.
 * effectiveType,returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed round-trip time and downlink values.
 * rtt,returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
 * */
import { INetworkInformation, IMetrics, IReportHandler, IConnection } from '../types'
import { isNavigatorSupported } from '../utils/isSupported'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'

const getNetworkInfo = (): INetworkInformation | undefined => {
  if (!isNavigatorSupported()) {
    console.warn('browser do not support performance')
    return
  }

  const connection = ('connection' in navigator ? navigator['connection'] : {}) as IConnection

  const { downlink, effectiveType, rtt } = connection

  return {
    downlink,
    effectiveType,
    rtt
  }
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initNetworkInfo = (store: metricsStore, report: IReportHandler, immediately = true): void => {
  const networkInfo: INetworkInformation = getNetworkInfo()

  const metrics = { name: metricsName.NI, value: networkInfo } as IMetrics

  if (immediately) {
    report(metrics)
  }

  store.set(metricsName.NI, metrics)
}
