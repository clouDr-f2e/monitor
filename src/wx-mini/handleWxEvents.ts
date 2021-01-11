import { BREADCRUMBTYPES, ERRORTYPES } from '@/common/constant'
import { breadcrumb, transportData } from '../core'
import { ReportDataType } from '@/types'
import { WxLifeCycleBreadcrumb, WxOnShareAppMessageBreadcrumb, WxOnTabItemTapBreadcrumb } from '@/types/breadcrumb'
import { Replace } from '@/types/replace'
import { getTimestamp, isError, unknownToString } from '@/utils'
import { Severity } from '@/utils/Severity'
import { getCurrentRoute, extractErrorStack } from './utils'
import { HandleEvents } from '@/browser/handleEvents'

const HandleWxAppEvents = {
  // app
  onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
    console.log('app onLaunch', options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_LAUNCH),
      type: BREADCRUMBTYPES.APP_ON_LAUNCH,
      data,
      level: Severity.Info
    })
  },
  onShow(options: WechatMiniprogram.App.LaunchShowOption) {
    console.log('app onShow', options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_SHOW),
      type: BREADCRUMBTYPES.APP_ON_SHOW,
      data,
      level: Severity.Info
    })
  },
  onHide() {
    console.log('app onHide')
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_HIDE),
      type: BREADCRUMBTYPES.APP_ON_HIDE,
      data: null,
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
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
      type: BREADCRUMBTYPES.ROUTE,
      data,
      level: Severity.Error
    })
  }
}

const HandleWxPageEvents = {
  onShow() {
    console.log('page onShow')
    const page = getCurrentPages().pop()
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHOW),
      type: BREADCRUMBTYPES.PAGE_ON_SHOW,
      data,
      level: Severity.Info
    })
  },
  onHide() {
    console.log('page onHide')
    const page = getCurrentPages().pop()
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_HIDE),
      type: BREADCRUMBTYPES.PAGE_ON_HIDE,
      data,
      level: Severity.Info
    })
  },
  onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption) {
    console.log('page onShareAppMessage')
    const page = getCurrentPages().pop()
    const data: WxOnShareAppMessageBreadcrumb = {
      path: page.route,
      query: page.options,
      options
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE),
      type: BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE,
      data,
      level: Severity.Info
    })
  },
  onShareTimeline() {
    console.log('page onShareTimeline')
    const page = getCurrentPages().pop()
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE),
      type: BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE,
      data,
      level: Severity.Info
    })
  },
  onTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption) {
    console.log('page onTabItemTap')
    const page = getCurrentPages().pop()
    const data: WxOnTabItemTapBreadcrumb = {
      path: page.route,
      query: page.options,
      options
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP),
      type: BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP,
      data,
      level: Severity.Info
    })
  }
}

const HandleWxConsoleEvents = {
  console(data: Replace.TriggerConsole) {
    HandleEvents.handleConsole(data)
  }
}

const HandleNetworkEvents = {
  request(requestOptions: WechatMiniprogram.RequestOption, error: WechatMiniprogram.GeneralCallbackResult) {
    console.log('sdk request err', error)
    const type = BREADCRUMBTYPES.MINIPROGRAM_REQUEST
    const data: ReportDataType = {
      type: ERRORTYPES.MINIPROGRAM_REQUEST_ERROR,
      stack: [],
      name: '',
      time: getTimestamp(),
      url: requestOptions.url,
      message: error.errMsg,
      level: Severity.Info
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.MINIPROGRAM_REQUEST,
      category: breadcrumb.getCategory(type),
      data,
      level: Severity.Info
    })
    transportData.send(data)
  }
}

export { HandleWxAppEvents, HandleWxPageEvents, HandleWxConsoleEvents, HandleNetworkEvents }
