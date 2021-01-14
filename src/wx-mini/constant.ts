export enum ELinstenerTypes {
  Touchmove = 'touchmove',
  Tap = 'tap'
}
const { miniProgram } = wx.getAccountInfoSync()
export const appId = miniProgram.appId
export const envVersion = miniProgram.envVersion
export const version = miniProgram.version
