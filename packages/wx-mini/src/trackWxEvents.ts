import { BREADCRUMBTYPES, ERRORTYPES } from '@mitojs/shared'
import { breadcrumb, transportData } from '@mitojs/core'
import { Severity } from '@mitojs/utils'
import { targetAsString } from './utils'
import { MiniRoute, WxLifeCycleBreadcrumb, WxOnShareAppMessageBreadcrumb, WxOnTabItemTapBreadcrumb } from './types'
import { ELinstenerTypes } from './constant'

// const TrackWxAppEvents = {
//   onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
//     const data: WxLifeCycleBreadcrumb = {
//       path: options.path,
//       query: options.query
//     }
//     breadcrumb.push({
//       category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_LAUNCH),
//       type: BREADCRUMBTYPES.APP_ON_LAUNCH,
//       data,
//       level: Severity.Info
//     })
//   },
//   onShow(options: WechatMiniprogram.App.LaunchShowOption) {
//     const data: WxLifeCycleBreadcrumb = {
//       path: options.path,
//       query: options.query
//     }
//     breadcrumb.push({
//       category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_SHOW),
//       type: BREADCRUMBTYPES.APP_ON_SHOW,
//       data,
//       level: Severity.Info
//     })
//   },
//   onHide() {
//     breadcrumb.push({
//       category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_HIDE),
//       type: BREADCRUMBTYPES.APP_ON_HIDE,
//       data: null,
//       level: Severity.Info
//     })
//   },
//   onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
//     breadcrumb.push({
//       category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
//       type: BREADCRUMBTYPES.ROUTE,
//       data,
//       level: Severity.Error
//     })
//   }
// }

const TrackWxPageEvents = {
  onShow() {
    const page = getCurrentPages().pop()
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options
    }
    // 检测参数 是否上报
  },
  onHide() {
    // console.log('page onHide')
    const page = getCurrentPages().pop()
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options
    }
    // 无痕上报
  },
  onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption) {
    // console.log('page onShareAppMessage')
    const page = getCurrentPages().pop()
    const data: WxOnShareAppMessageBreadcrumb = {
      path: page.route,
      query: page.options,
      options
    }
    // 是否无痕上报
  },
  onShareTimeline() {
    // console.log('page onShareTimeline')
    const page = getCurrentPages().pop()
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options
    }
    //
  },
  onTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption) {
    // console.log('page onTabItemTap')
    const page = getCurrentPages().pop()
    const data: WxOnTabItemTapBreadcrumb = {
      path: page.route,
      query: page.options,
      options
    }
    //
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

const TrackWxEvents = {
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

export { TrackWxPageEvents, TrackWxEvents }
