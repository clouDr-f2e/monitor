import { options } from '../core/options'
import { ReplaceHandler, subscribeEvent, triggerHandlers } from '../common/subscribe'
import { replaceOld, throttle } from '../utils/helpers'

// const wx: WechatMiniprogram.App = {}

enum AppLifeCycle {
  onLaunch = 'onLaunch',
  onShow = 'onShow',
  onHide = 'onHide',
  onError = 'onError'
}

const clickThrottle = throttle(triggerHandlers, 600)

function isFilterHttpUrl(url: string) {
  return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url)
}

function replace() {}

export function addReplaceHandler(handler: ReplaceHandler) {
  subscribeEvent(handler)
  // replace(handler.type)
}

function replaceApp() {
  if (App) {
    const methods = [AppLifeCycle.onLaunch, AppLifeCycle.onShow, AppLifeCycle.onHide, AppLifeCycle.onError]
    methods.forEach((method) => {
      if (!(method in App)) return
      replaceOld(App, method, function (originMethod) {
        return function (options: WechatMiniprogram.App.LaunchShowOption): void {
          // console.log(options)
          appMethodsHandle(method)
          originMethod.apply(App, options)
        }
      })
    })
  }
}

function appMethodsHandle(lifeCycle: AppLifeCycle) {
  switch (lifeCycle) {
    case AppLifeCycle.onLaunch:
      break
    case AppLifeCycle.onShow:
      break
    case AppLifeCycle.onHide:
      break
    case AppLifeCycle.onError:
      break
    default:
      break
  }
}
