import { IMetrics, IReportHandler } from '../types'

const createReporter = (sectionId: string, callback: Function): IReportHandler => (data: IMetrics | Array<IMetrics>) => {
  callback({
    sectionId,
    data
  })
}

export default createReporter
