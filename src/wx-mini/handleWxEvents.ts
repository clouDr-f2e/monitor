import { BREADCRUMBTYPES, ERRORTYPES, HTTPTYPE } from '@/common/constant'
import { breadcrumb, httpTransform, transportData } from '../core'
import { ReportDataType } from '@/types'
import { WxLifeCycleBreadcrumb, WxOnShareAppMessageBreadcrumb, WxOnTabItemTapBreadcrumb } from '@/types/breadcrumb'
import { Replace } from '@/types/replace'
import { extractErrorStack, getTimestamp, isError, isHttpFail, setUrlQuery, parseErrorString, unknownToString } from '@/utils'
import { Severity } from '@/utils/Severity'
import { getCurrentRoute, targetAsString } from './utils'
import { HandleEvents } from '@/browser/handleEvents'
import { MITOHttp } from '@/types/common'
import { MiniRoute } from './types'
import { ELinstenerTypes } from './constant'

const HandleWxAppEvents = {
  onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
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
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_HIDE),
      type: BREADCRUMBTYPES.APP_ON_HIDE,
      data: null,
      level: Severity.Info
    })
  },
  onError(error: string) {
    const parsedError = parseErrorString(error)
    const data: ReportDataType = {
      ...parsedError,
      time: getTimestamp(),
      level: Severity.Normal,
      url: getCurrentRoute(),
      type: ERRORTYPES.JAVASCRIPT_ERROR
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
      type: BREADCRUMBTYPES.CODE_ERROR,
      level: Severity.Error,
      data: { ...data }
    })
    transportData.send(data)
  },
  onUnhandledRejection(ev: WechatMiniprogram.OnUnhandledRejectionCallbackResult) {
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
        ...extractErrorStack(ev.reason, Severity.Low),
        url: getCurrentRoute()
      }
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
      data: { ...data },
      level: Severity.Error
    })
    transportData.send(data)
  },
  onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
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
    // console.log('page onHide')
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
    // console.log('page onShareAppMessage')
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
    // console.log('page onShareTimeline')
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
    // console.log('page onTabItemTap')
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
  },
  onAction(e: WechatMiniprogram.BaseEvent) {
    let type = BREADCRUMBTYPES.TOUCHMOVE
    if (e.type === ELinstenerTypes.Tap) {
      type = BREADCRUMBTYPES.TAP
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(type),
      type,
      data: targetAsString(e),
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
  handleRequest(data: MITOHttp): void {
    const result = httpTransform(data)
    result.url = getCurrentRoute()
    if (data.status === undefined) {
      result.message = data.errMsg
    }
    const type = BREADCRUMBTYPES.XHR
    breadcrumb.push({
      type,
      category: breadcrumb.getCategory(type),
      data: result,
      level: Severity.Info
    })
    if (isHttpFail(data.status)) {
      breadcrumb.push({
        type,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
        data: { ...result },
        level: Severity.Error
      })
      transportData.send(result)
    }
  }
}

const HandleWxEvents = {
  handleRoute(data: MiniRoute) {
    if (data.isFail) {
      breadcrumb.push({
        type: BREADCRUMBTYPES.ROUTE,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
        data,
        level: Severity.Error
      })

      const reportData = {
        type: ERRORTYPES.ROUTE_ERROR,
        message: data.message,
        url: data.to,
        name: 'MINI_' + ERRORTYPES.ROUTE_ERROR,
        level: Severity.Error
      }

      return transportData.send(reportData)
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
      data,
      level: Severity.Info
    })
  }
}

export { HandleWxAppEvents, HandleWxPageEvents, HandleWxConsoleEvents, HandleNetworkEvents, HandleWxEvents }
