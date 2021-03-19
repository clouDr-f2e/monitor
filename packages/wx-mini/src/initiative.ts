import { EActionType, ITrackEventParam, ITrackPageParam, TrackReportData } from '@mitojs/types'
import { transportData } from '@mitojs/core'
import { generateUUID } from 'packages/utils/src'

const preEventTrack = {}
const sessionId = ''

export function trackPage(param: ITrackPageParam) {}

export function trackEvent(param: ITrackEventParam) {}

export function trackDuration() {
  const data: TrackReportData = {
    actionType: EActionType.DURATION,
    trackId: generateUUID()
  }
  transportData.send(data)
}
