export enum ELinstenerTypes {
  Touchmove = 'touchmove',
  Tap = 'tap'
}
export function getAppId() {
  return wx.getAccountInfoSync().miniProgram.appId
}
