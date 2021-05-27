import { IMetrics, IReportHandler } from '../types'

const createReporter = (sectionId: string, appId: string, version: string, callback: Function): IReportHandler => (
  data: IMetrics | Array<IMetrics>
) => {
  if ('requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(
      () => {
        callback({
          sectionId,
          appId,
          version,
          data
        })
      },
      { timeout: 3000 }
    )
  } else {
    callback({
      sectionId,
      appId,
      version,
      data
    })
  }
}

export default createReporter
