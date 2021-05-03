// pages/automator/automator.js
Page({
  data: {},
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},

  onTapError() {
    this.unFun()
  },
  onTapRejectPromise() {
    return Promise.reject('Promise reject str')
  },
  onTapRequest() {
    wx.request({
      url: '/exception',
      data: {
        a: 1,
        b: 2
      },
      success(res) {
        console.log('res = ', res)
      },
      fail(err) {
        console.log('err = ', err)
      }
    })
  },
  onTapNoRoute() {
    wx.navigateTo({
      url: '/pages/noRoute/index'
    }).catch((err) => console.log('跳转到一个不存的页面出错：：：', err))
  },
  onTapDownFile() {
    // 存在的地址
    wx.downloadFile({
      url: 'https://www.baidu.com/downloadFile',
      success(res) {
        console.log('下载文件成功', res)
      },
      fail(res) {
        console.log('下载文件失败', res)
      }
    })
  },
  onTapRoute() {
    wx.navigateTo({
      url: '/pages/index/index?telescope-info={way:"navigateTo"}'
    })
  }
})
