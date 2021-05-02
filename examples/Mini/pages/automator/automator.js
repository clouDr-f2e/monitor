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

  onTapRequest() {
    console.log('onTapRequest ')
    wx.request({
      url: 'http://www.baidu.com',
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
  onTapRequest2() {
    console.log('onTapRequest ')
    wx.request({
      url: 'http://www.baidu.com2',
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
  onTapError() {
    this.unFun()
  },
  onTapRejectPromise() {
    return Promise.reject('Promise reject str')
  },
  onTapNoRoute() {
    wx.navigateTo({
      url: '/pages/noRoute/index'
    }).catch((err) => console.log('跳转到一个不存的页面出错：：：', err))
  },
  onTapRoute() {
    wx.navigateTo({
      url: '/pages/index/index?telescope-info={way:"navigateTo"}'
    })
  },
  onTapRediretRoute() {
    wx.redirectTo({
      url: '/pages/index/index?telescope-info={way:"redirectTo"}'
    })
  },
  onTapBackRoute() {
    wx.navigateBack({
      delta: 1
    })
  },
  onTapDownFile() {
    // 存在的地址
    wx.downloadFile({
      url:
        'http://static.qa.91jkys.com/saas-mall-operate/upload/cache/%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E7%BB%93%E6%9E%9C%E6%98%8E%E7%BB%86_20201227220351.xlsx',
      success(res) {
        console.log('下载文件成功', res)
      },
      fail(res) {
        console.log('下载文件失败', res)
      }
    })
  }
})
