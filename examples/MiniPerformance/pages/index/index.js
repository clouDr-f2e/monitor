// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {},
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onLoad() {
    setTimeout(() => {
      const wxPerformance = app.globalData.wxPerformance
      wxPerformance.customPaint()
    }, 100)
  },
  onReady() {},

  onTap(e) {
    console.log('onTap e = ', e)
  },

  onNavigate() {
    wx.navigateTo({
      url: '/pages/test/test'
    })
  },

  onTapRequest() {
    wx.request({
      url: '/exception',
      method: 'GET',
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
  onTapDownFile() {
    // 存在的地址
    wx.downloadFile({
      url: 'http://static.qa.91jkys.com/saas-mall-operate/upload/cache/%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E7%BB%93%E6%9E%9C%E6%98%8E%E7%BB%86_20201227220351.xlsx',
      success(res) {
        console.log('下载文件成功', res)
      },
      fail(res) {
        console.log('下载文件失败', res)
      }
    })
  },

  onTapUploadFile() {
    wx.chooseImage({
      count: 1,
      success(res) {
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'name',
          url: 'url',
          success(result) {
            console.log('uploadFile result = ', result)
          },
          fail(error) {
            console.log('uploadFile error = ', error)
          }
        })
      },
      fail(err) {
        console.log('chooseImage err = ', err)
      }
    })
  }
})
