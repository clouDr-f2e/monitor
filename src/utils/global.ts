import { EVENTTYPES } from '../common/common'
import { TransportData } from '../core/transportData'
import { Breadcrumb } from '../core/breadcrumb'
import { Logger } from './logger'
import { Options } from '../core/options'

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
  console: Console
  __MITO__: MitoSupport
}

export function isNodeEnv(): boolean {
  // tslint:disable:strict-type-predicates
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
}
/**
 * 获取全局变量
 *
 * ../returns Global scope object
 */
export function getGlobal<T>(): T & MITOGlobal {
  return (isNodeEnv() ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}) as T & MITOGlobal
}

const _global = getGlobal<Window>()
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
