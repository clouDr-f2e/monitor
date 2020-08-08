import { Severity } from '@/utils/Severity'

export interface BreadcrumbPushData {
  type: string
  data: any
  time?: number
  level: Severity
}
