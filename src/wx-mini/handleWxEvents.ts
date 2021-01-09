import { BREADCRUMBTYPES, ERRORTYPES } from '@/common/constant'
import { breadcrumb, transportData } from '../core'
import { ReportDataType } from '@/types'
import { WxLifeCycleBreadcrumb } from '@/types/breadcrumb'
import { Replace } from '@/types/replace'
import { getTimestamp, isError, extractErrorStack, unknownToString } from '@/utils'
import { Severity } from '@/utils/Severity'
import { getCurrentRoute } from './utils'
import { HandleEvents } from '@/browser/handleEvents'

const HandleWxEvents = {
  // app
  onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
    console.log('onLaunch', options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ON_LAUNCH),
      type: BREADCRUMBTYPES.ON_LAUNCH,
      data,
      level: Severity.Info
    })
  },
  onShow(options: WechatMiniprogram.App.LaunchShowOption) {
    console.log('onShow', options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ON_SHOW),
      type: BREADCRUMBTYPES.ON_SHOW,
      data,
      level: Severity.Info
    })
  },
  onError(error: string) {
    // 需要用正则转换
    console.log('onError', error)
    const data: ReportDataType = {
      stack: [],
      message: '',
      name: '',
      time: getTimestamp(),
      level: Severity.Normal,
      url: getCurrentRoute()
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
      type: BREADCRUMBTYPES.CODE_ERROR,
      level: Severity.Error,
      data
    })
    transportData.send(data)
  },
  onUnhandledRejection(ev: WechatMiniprogram.OnUnhandledRejectionCallbackResult) {
    console.log('onUnhandledRejection', ev)
    let data: ReportDataType = {
      type: ERRORTYPES.PROMISE_ERROR,
      message: unknownToString(ev.reason),
      url: getCurrentRoute(),
      name: 'unhandledrejection', // 小程序当初onUnhandledRejection回调中无type参数，故写死
      time: getTimestamp(),
      level: Severity.Low
    }
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Low)
      }
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
      data: data,
      level: Severity.Error
    })
    transportData.send(data)
  },
  onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
    console.log('OnPageNotFoundCallbackResult', data)
  },
  console(data: Replace.TriggerConsole) {
    HandleEvents.handleConsole(data)
  }
}

export default HandleWxEvents
