import MiniProgram from 'miniprogram-automator/out/MiniProgram'
import Page from 'miniprogram-automator/out/Page'
import automator from 'miniprogram-automator'
import { resolve } from 'path'
import {
  WxPerformanceData,
  WxPerformanceDataType,
  WxPerformanceItemType,
  WxPerformanceItem
} from '../../../packages/wx-mini-performance/src/types'

const APPID = 'a1329cc0-563b-11eb-98fe-259847d73cdd'
const WIFI = ['wifi', '2g', '3g', '4g', '5g', 'unknown', 'none']
const TEMP_FILE = 'http://tmp/2rPKfFSlT4jcf43b31be29a47fecd8890b363180b043.jpg'

describe('Min e2e:', () => {
  const timeout = 60000 // 打开开发工具较慢
  const waitFor = 1000
  let _miniProgram: MiniProgram
  let _page: Page

  async function getData(): Promise<WxPerformanceData[][]> {
    return await _miniProgram.evaluate(() => {
      return wx['__MITO_MINI_PERFORMANCE__'].data as WxPerformanceData[][]
    })
  }

  async function reset() {
    return await _miniProgram.evaluate(() => {
      wx['__MITO_MINI_PERFORMANCE__'].data = []
      return
    })
  }

  /**
   * 请确保本地安装了开发工具并打开了安全端口
   * 如何打开端口
   * 微信开发工具设置 -> 安全设置 -> 安全 -> 打开服务端口
   */
  beforeAll(async () => {
    try {
      const miniProgram: MiniProgram = await automator.launch({
        projectPath: resolve(__dirname, '../../../examples/MiniPerformance')
      })
      _miniProgram = miniProgram
      const page: Page = await miniProgram.currentPage()
      _page = page
    } catch (err) {
      console.warn('err = ', err)
    }
  }, timeout)

  it(
    'The Performance Data in Wx_Launch include Wx_Lifestyle, WX_PERFORMANCE and WxCustomPaint',
    async (done) => {
      await _page.waitFor(waitFor)
      await _page.waitFor(async () => {
        return (await getData()).length > 0
      })

      // Wx_Lifestyle
      const data: WxPerformanceData[][] = await getData()

      const launchData = data[0][0]

      expect(launchData).toHaveProperty('timestamp')
      expect(launchData).toHaveProperty('uuid')
      expect(launchData).toHaveProperty('systemInfo')
      expect(launchData).toHaveProperty('deviceId')
      expect(launchData).toHaveProperty('item')
      expect(launchData).toHaveProperty('page')
      expect(launchData).toHaveProperty('wxLaunch')

      expect(launchData.appId).toBe(APPID)
      expect(launchData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)
      expect(WIFI.some((x) => x === launchData.networkType)).toBeTruthy()

      const launchItem = launchData.item

      expect(Array.isArray(launchItem)).toBeTruthy()
      expect(launchItem[0]).toHaveProperty('timestamp')
      expect((launchItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.AppOnLaunch)

      const wxShowData = data[1][0]
      expect(wxShowData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)

      const wxShowItem = wxShowData.item
      expect((wxShowItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.AppOnShow)

      const wxLoadData = data[2][0]
      expect(wxLoadData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)

      const wxLoadItem = wxLoadData.item
      expect((wxLoadItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.PageOnLoad)

      const wxReadyData = data[3][0]
      expect(wxReadyData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)

      const wxReadyItem = wxReadyData.item
      expect((wxReadyItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.PageOnReady)

      // WX_PERFORMANCE
      const performanceData = data[4][0]

      expect(performanceData.type).toBe(WxPerformanceDataType.WX_PERFORMANCE)

      const performanceItem = performanceData.item
      expect(Array.isArray(performanceItem)).toBeTruthy()
      expect(performanceItem.length).toBe(3)
      expect((performanceItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.Performance)
      expect((performanceItem[1] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.Performance)
      expect((performanceItem[2] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.Performance)

      // WxCustomPaint
      const wxCustomPaintData = data[5][0]
      expect(wxCustomPaintData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)

      const wxCustomPaintItem = wxCustomPaintData.item
      expect((wxCustomPaintItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.WxCustomPaint)
      expect(wxCustomPaintItem[0] as WxPerformanceItem).toHaveProperty('duration')
      expect(wxCustomPaintItem[0] as WxPerformanceItem).toHaveProperty('navigationStart')
      expect(wxCustomPaintItem[0] as WxPerformanceItem).toHaveProperty('timestamp')

      done()
    },
    timeout
  )

  it(
    'The Performance Data on Click',
    async (done) => {
      await reset()

      const element = await _page.$('#click-btn')
      await element.tap()

      await _page.waitFor(async () => {
        return (await getData()).length > 0
      })

      const data: WxPerformanceData[][] = await getData()

      const clickData = data[0][0]

      expect(clickData).toHaveProperty('timestamp')
      expect(clickData).toHaveProperty('uuid')
      expect(clickData).toHaveProperty('systemInfo')
      expect(clickData).toHaveProperty('deviceId')
      expect(clickData).toHaveProperty('item')
      expect(clickData).toHaveProperty('page')
      expect(clickData).toHaveProperty('wxLaunch')

      expect(clickData.appId).toBe(APPID)
      // expect(clickData.page).toBe('pages/index/index?')
      expect(clickData.type).toBe(WxPerformanceDataType.WX_USER_ACTION)
      expect(WIFI.some((x) => x === clickData.networkType)).toBeTruthy()

      const clickItem = clickData.item

      expect(Array.isArray(clickItem)).toBeTruthy()
      expect(clickItem[0]).toHaveProperty('timestamp')
      expect((clickItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.UserTap)

      done()
    },
    timeout
  )

  it(
    'The Performance Data on Request',
    async (done) => {
      await reset()

      const element = await _page.$('#click-request-btn')
      await element.tap()

      await _page.waitFor(async () => {
        return (await getData()).length > 0
      })

      const data: WxPerformanceData[][] = await getData()

      const requestData = data[0][0]

      expect(requestData).toHaveProperty('timestamp')
      expect(requestData).toHaveProperty('uuid')
      expect(requestData).toHaveProperty('systemInfo')
      expect(requestData).toHaveProperty('deviceId')
      expect(requestData).toHaveProperty('item')
      expect(requestData).toHaveProperty('page')
      expect(requestData).toHaveProperty('wxLaunch')

      expect(requestData.appId).toBe(APPID)
      expect(requestData.page).toBe('pages/index/index?')
      expect(requestData.type).toBe(WxPerformanceDataType.WX_NETWORK)
      expect(WIFI.some((x) => x === requestData.networkType)).toBeTruthy()

      const requestItem = requestData.item

      expect(Array.isArray(requestItem)).toBeTruthy()
      expect(requestItem[0]).toHaveProperty('startTime')
      expect(requestItem[0]).toHaveProperty('endTime')
      expect(requestItem[0]).toHaveProperty('url')
      expect(requestItem[0]).toHaveProperty('status')
      expect(requestItem[0]).toHaveProperty('header')
      expect(requestItem[0]).toHaveProperty('errMsg')
      expect((requestItem[0] as WxPerformanceItem).method).toBe('GET')

      done()
    },
    timeout
  )

  it(
    'The Performance Data on Download File',
    async (done) => {
      await reset()

      const element = await _page.$('#click-down-file-btn')
      await element.tap()

      await _page.waitFor(async () => {
        return (await getData()).length > 0
      })

      const data: WxPerformanceData[][] = await getData()

      const downFileData = data[0][0]

      expect(downFileData).toHaveProperty('timestamp')
      expect(downFileData).toHaveProperty('uuid')
      expect(downFileData).toHaveProperty('systemInfo')
      expect(downFileData).toHaveProperty('deviceId')
      expect(downFileData).toHaveProperty('item')
      expect(downFileData).toHaveProperty('page')
      expect(downFileData).toHaveProperty('wxLaunch')

      expect(downFileData.appId).toBe(APPID)
      expect(downFileData.page).toBe('pages/index/index?')
      expect(downFileData.type).toBe(WxPerformanceDataType.WX_NETWORK)
      expect(WIFI.some((x) => x === downFileData.networkType)).toBeTruthy()

      const downFileItem = downFileData.item

      expect(Array.isArray(downFileItem)).toBeTruthy()
      expect(downFileItem[0]).toHaveProperty('startTime')
      expect(downFileItem[0]).toHaveProperty('endTime')
      expect(downFileItem[0]).toHaveProperty('url')
      expect(downFileItem[0]).toHaveProperty('header')
      expect(downFileItem[0]).toHaveProperty('errMsg')
      // expect((downFileItem[0] as WxPerformanceItem).method).toBe('GET')
      expect((downFileItem[0] as WxPerformanceItem).status).toBe(200)

      done()
    },
    timeout
  )

  it(
    'The Performance Data on Upload File',
    async (done) => {
      await reset()

      await _miniProgram.mockWxMethod('chooseImage', {
        tempFilePaths: [TEMP_FILE]
      })

      const element = await _page.$('#click-up-file-btn')
      await element.tap()

      await _page.waitFor(async () => {
        return (await getData()).length > 0
      })

      const data: WxPerformanceData[][] = await getData()

      const upFileData = data[0][0]

      expect(upFileData).toHaveProperty('timestamp')
      expect(upFileData).toHaveProperty('uuid')
      expect(upFileData).toHaveProperty('systemInfo')
      expect(upFileData).toHaveProperty('deviceId')
      expect(upFileData).toHaveProperty('item')
      expect(upFileData).toHaveProperty('page')
      expect(upFileData).toHaveProperty('wxLaunch')

      expect(upFileData.appId).toBe(APPID)
      expect(upFileData.page).toBe('pages/index/index?')
      expect(upFileData.type).toBe(WxPerformanceDataType.WX_NETWORK)
      expect(WIFI.some((x) => x === upFileData.networkType)).toBeTruthy()

      const upFileItem = upFileData.item

      expect(Array.isArray(upFileItem)).toBeTruthy()
      expect(upFileItem[0]).toHaveProperty('startTime')
      expect(upFileItem[0]).toHaveProperty('endTime')
      expect(upFileItem[0]).toHaveProperty('header')
      expect(upFileItem[0]).toHaveProperty('errMsg')
      expect(upFileItem[0]).toHaveProperty('filePath')
      expect((upFileItem[0] as WxPerformanceItem).status).toBe(0)
      expect((upFileItem[0] as WxPerformanceItem).filePath).toBe(TEMP_FILE)

      done()
    },
    timeout
  )

  it(
    'The Performance Data on Navigate',
    async (done) => {
      await reset()

      const element = await _page.$('#navigate-btn')
      await element.tap()

      await _page.waitFor(async () => {
        return (await getData()).length > 0
      })

      await _page.waitFor(waitFor)

      const data: WxPerformanceData[][] = await getData()

      // Wx_Lifestyle
      const wxLoadData = data[0][0]
      expect(wxLoadData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)

      const wxLoadItem = wxLoadData.item
      expect((wxLoadItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.PageOnLoad)

      const wxReadyData = data[1][0]
      expect(wxReadyData.type).toBe(WxPerformanceDataType.WX_LIFE_STYLE)

      const wxReadyItem = wxReadyData.item
      expect((wxReadyItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.PageOnReady)

      // WX_PERFORMANCE
      const performanceData = data[2][0]

      expect(performanceData.type).toBe(WxPerformanceDataType.WX_PERFORMANCE)
      expect(performanceData.page).toBe('pages/test/test?')

      const performanceItem = performanceData.item
      expect(Array.isArray(performanceItem)).toBeTruthy()
      expect(performanceItem.length).toBe(2)
      expect((performanceItem[0] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.Performance)
      expect((performanceItem[1] as WxPerformanceItem).itemType).toBe(WxPerformanceItemType.Performance)

      done()
    },
    timeout
  )
})
