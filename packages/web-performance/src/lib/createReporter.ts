import { IMetrics, IReportHandler } from '../types'

const createReporter = (sectionId: string, callback: Function): IReportHandler => (data: IMetrics | Array<IMetrics>) => {
  if ('requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(
      () => {
        callback({
          sectionId,
          data
        })
      },
      { timeout: 3000 }
    )
  } else {
    callback({
      sectionId,
      data
    })
  }
}

export default createReporter
