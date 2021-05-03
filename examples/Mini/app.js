import * as MITO from './utils/wx-mini'
MITO.init({
  apikey: 'a1329cc0-563b-11eb-98fe-259847d73cdd',
  projectId: 1,
  dsn: 'http://localhost:2021/errors/upload',
  silentConsole: true,
  debug: false
})

function interceptRequest(params) {
  Object.assign(wx, {
    __MITO_REQUEST__: params
  })
  return params
}

let wxRequest = wx.request

function newRequest(params) {
  return wxRequest(interceptRequest(params))
}

Object.defineProperty(wx, 'request', {
  value: newRequest,
  writable: true,
  configurable: true
})

App({
  onLaunch() {},
  globalData: {}
})
