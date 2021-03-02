export function getAppId() {
  return wx.getAccountInfoSync().miniProgram.appId
}
