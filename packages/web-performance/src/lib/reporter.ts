import { IMetrics } from '../types'

const createReporter = (sectionId: string) => (data: IMetrics | Array<IMetrics>) => {}

export default createReporter
