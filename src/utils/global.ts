import { EVENTTYPES } from '../common/common'
import { TransportData } from '../core/transportData'
import { Breadcrumb } from '../core/breadcrumb'
import { Logger } from './logger'
import { Options } from '../core/options'
import { variableTypeDetection } from './is'

// MITO的全局变量
export interface MitoSupport {
  logger: Logger
  breadcrumb: Breadcrumb
  transportData: TransportData
  replaceFlag: { [key in EVENTTYPES]?: boolean }
  record?: any[]
  options?: Options
}

interface MITOGlobal {
  console?: Console
  __MITO__?: MitoSupport
}

export const isNodeEnv = (): boolean => variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0)

export const isWxMiniEnv = (): boolean =>
  variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) && variableTypeDetection.isObject(typeof App !== 'undefined' ? App : 0)

export const isBrowserEnv = (): boolean => variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0)
/**
 * 获取全局变量
 *
 * ../returns Global scope object
 */
export function getGlobal<T>() {
  if (isBrowserEnv()) return (window as unknown) as MITOGlobal & T
  if (isWxMiniEnv()) return (wx as unknown) as MITOGlobal & T
  if (isNodeEnv()) return (process as unknown) as MITOGlobal & T
}

const _global = getGlobal<Window & WechatMiniprogram.Wx>()
const _support = getGlobalMitoSupport()

export { _global, _support }

_support.replaceFlag = _support.replaceFlag || {}
const replaceFlag = _support.replaceFlag
export function setFlag(replaceType: EVENTTYPES, isSet: boolean): void {
  if (replaceFlag[replaceType]) return
  replaceFlag[replaceType] = isSet
}

export function getFlag(replaceType: EVENTTYPES): boolean {
  return replaceFlag[replaceType] ? true : false
}

/**
 * 获取全部变量__MITO__的引用地址
 *
 * ../returns global variable of MITO
 */
export function getGlobalMitoSupport(): MitoSupport {
  _global.__MITO__ = _global.__MITO__ || ({} as MitoSupport)
  return _global.__MITO__
}
