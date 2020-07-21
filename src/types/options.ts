import { Breadcrumb } from '@/core/breadcrumb'
import { BreadcrumbPushData } from './breadcrumb'
import { ReportDataType } from './transportData'
type CANCEL = null | undefined | boolean
export interface InitOptions extends SilentEventTypes, HooksTypes {
  /**
   * dsn服务器地址
   */
  dsn?: string
  /**
   * 为true时，整个sdk将禁用
   */
  disabled?: boolean
  /**
   * 每个项目有一个唯一key
   */
  apikey?: string
  /**
   * 默认为关闭，为true是会打印一些信息：breadcrumb
   */
  debug?: boolean
  /**
   * 忽视某些错误不上传
   */
  // ignoreErrors?: Array<string | RegExp>
  /**
   * 线上版本
   */
  version?: string
  /**
   * 默认20，最大100，超过100还是设置成100
   */
  maxBreadcrumbs?: number
  /** Attaches stacktraces to pure capture message / log integrations */
  attachStacktrace?: boolean
  /** Maxium number of chars a single value can have before it will be truncated. */
  maxValueLength?: number
  /**
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   * 会在xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')、
   * xhr.withCredentials = true,后面调用该函数
   * @param xhr XMLHttpRequest的实例
   */
  configXhr?(xhr: XMLHttpRequest): void
}

export interface HooksTypes {
  /**
   * 钩子函数，在每次发送事件前会调用
   *
   * @param event 有SDK生成的错误事件
   * @returns 如果返回 null | undefined | boolean 时，将忽略本次上传
   */
  beforeSend?(event: ReportDataType): PromiseLike<Event | null> | Event | CANCEL
  /**
   * 钩子函数，在每次添加用户行为事件前都会调用
   *
   * @param breadcrumb 由SDK生成的breacrumb事件栈
   * @param hint 当次的生成的breadcrumb数据
   * @returns 如果返回 null | undefined | boolean 时，将忽略本次的push
   */
  beforeBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL
  /**
   * 在状态小于400并且不等于0的时候回调用当前hook
   * @param data 请求状态为200时返回的响应体
   * @returns 如果返回 null | undefined | boolean 时，将忽略本次的上传
   */
  httpResponseHandle?<T>(data: T): string | CANCEL
}

export interface SilentEventTypes {
  /**
   * 静默监控Xhr事件
   */
  silentXhr?: boolean
  /**
   * 静默监控fetch事件
   */
  silentFetch?: boolean
  /**
   * 静默监控console事件
   */
  silentConsole?: boolean
  /**
   * 静默监控Dom事件
   */
  silentDom?: boolean
  /**
   * 静默监控history事件
   */
  silentHistory?: boolean
  /**
   * 静默监控error事件
   */
  silentError?: boolean
  /**
   * 静默监控unhandledrejection事件
   */
  silentUnhandledrejection?: boolean
  /**
   * 静默监控hashchange事件
   */
  silentHashchange?: boolean
  /**
   * 静默监控Vue.warn函数
   */
  silentVue?: boolean
}
