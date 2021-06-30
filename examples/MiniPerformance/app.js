const {WxPerformance} = require('./utils/wx-mini-performance.js')

const wxPerformance = new WxPerformance({
  appId: "a1329cc0-563b-11eb-98fe-259847d73cdd",
  immediately: true,
  report: (data) => {
    console.log('WxPerformance data = ', data)
  }
})

console.log('wxPerformance = ', wxPerformance)

App({
  onLaunch() {},
  globalData: {}
})
