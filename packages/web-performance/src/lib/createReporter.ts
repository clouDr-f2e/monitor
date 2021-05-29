import { IMetrics, IReportHandler, IReportData } from '../types'

/**
 * @param {string} sectionId
 * @param {string} appId
 * @param {string} version
 * @param {Function} callback
 * @returns {IReportHandler}
 */
const createReporter = (sectionId: string, appId: string, version: string, callback: Function): IReportHandler => (
  data: IMetrics | Array<IMetrics>
) => {
  const reportData: IReportData = {
    sectionId,
    appId,
    version,
    data,
    timestamp: +new Date()
  }

  if ('requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(
      () => {
        callback(reportData)
      },
      { timeout: 3000 }
    )
  } else {
    callback(reportData)
  }
}

export default createReporter
