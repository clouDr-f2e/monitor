import { EActionType, ITrackBaseParam, TrackReportData } from '@mitojs/types'
import { transportData } from '@mitojs/core'
import { generateUUID, getTimestamp } from '@mitojs/utils'

export function track(actionType: EActionType, param: ITrackBaseParam) {
  const { trackId } = param
  const data = {
    actionType,
    trackId
  }
  sendTrackData(data)
}
// 在init的page onHide hooks中调用
// export function trackDuration() {
//   const data: TrackReportData = {
//     actionType: EActionType.DURATION,
//     trackId: generateUUID()
//   }
//   sendTrackData(data)
// }

/**
 * 手动发送埋点数据到服务端
 * @param data 埋点上报的数据，必须含有actionType属性
 */
export function sendTrackData(data: TrackReportData) {
  const id = generateUUID()
  const startTime = getTimestamp()
  transportData.send({
    id,
    startTime,
    ...data
  })
}
