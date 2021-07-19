const MITO = require('./utils/wx-mini-performance.js')

wx["__MITO_MINI_PERFORMANCE__"] = {
  data: []
}

const wxPerformance = new MITO.WxPerformance({
  appId: "a1329cc0-563b-11eb-98fe-259847d73cdd",
  immediately: true,
  report: (data) => {
    // console.log('WxPerformance data = ', data)
    console.log('data = ', data)
    wx["__MITO_MINI_PERFORMANCE__"].data.push(data)
  }
})


App({
  onLaunch() {},
  globalData: {
    wxPerformance
  }
})
