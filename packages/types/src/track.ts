export enum EActionType {
  // 页面曝光
  PAGE = 'PAGE',
  // 事件埋点
  EVENT = 'EVENT',
  // 区域曝光
  VIEW = 'VIEW',
  // 时长埋点
  DURATION = 'DURATION',
  // 其他埋点类型
  OTHER = 'OTHER'
}

export interface DeviceInfo {
  //网络类型: 4g,3g,5g,wifi
  netType: string
  clientWidth: number
  clientHeight: number
  // 像素密度倍率(计算屏幕实际宽高 可使用此参数： 例 height = clientHeight * radio)
  ratio: number
}

export interface ITrackBaseParam {
  trackId?: string
  custom?: string | { [prop: string]: string | number | boolean }
  [key: string]: any
}
