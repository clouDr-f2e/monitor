const HandleWxEvents = {
  // app
  onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
    console.log('onLaunch', options)
  },
  onShow(options: WechatMiniprogram.App.LaunchShowOption) {
    console.log('onShow', options)
  },
  onError(error: string) {
    // 需要用正则转换
    console.log('onError', error)
  },
  onUnhandledRejection(data: WechatMiniprogram.OnUnhandledRejectionCallbackResult) {
    console.log('onUnhandledRejection', data)
  },
  onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
    console.log('OnPageNotFoundCallbackResult', data)
  }
}

export default HandleWxEvents
