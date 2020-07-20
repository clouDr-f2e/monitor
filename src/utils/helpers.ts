import { EVENTTYPES, voidFun } from '@/common'
import { Breadcrumb, Logger, TransportData } from 'core'
// MITO的全局变量
export interface MitoSupport {
  logger: Logger
  breadcrumb: Breadcrumb
  transportData: TransportData
  replaceFlag: { [key in EVENTTYPES]?: boolean }
  record?: any[]
}

interface MITOGlobal {
  console: Console
  __MITO__: MitoSupport
}

// 用到所有事件名称
type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap

/**
 * Checks whether we're in the Node.js or Browser environment
 */
export function isNodeEnv(): boolean {
  // tslint:disable:strict-type-predicates
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
}
/**
 * 获取全局变量
 *
 * @returns Global scope object
 */
export function getGlobal<T>(): T & MITOGlobal {
  return (isNodeEnv() ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}) as T & MITOGlobal
}

const _global = getGlobal<Window>()
const _support = geGlobaltMitoSupport()

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
 * @returns global variable of MITO
 */
export function geGlobaltMitoSupport(): MitoSupport {
  _global.__MITO__ = _global.__MITO__ || ({} as MitoSupport)
  return _global.__MITO__
}

export function getLocationHref(): string {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}

/**
 * 添加事件监听器
 *
 * @export
 * @param {{ addEventListener: Function }} target
 * @param {keyof TotalEventName} eventName
 * @param {Function} handler
 * @param {(boolean | Object)} opitons
 * @returns
 */
export function on(target: { addEventListener: Function }, eventName: TotalEventName, handler: Function, opitons: boolean | unknown = false): void {
  target.addEventListener(eventName, handler, opitons)
}

/**
 *
 * 重写对象上面的某个属性
 * @param source 需要被重写的对象
 * @param name 需要被重写对象的key
 * @param replacement 以原有的函数作为参数，执行并重写原有函数
 * @returns void
 */
export function replaceOld(
  source: {
    [key: string]: any
  },
  name: string,
  replacement: (...args: any[]) => any
): void {
  if (!(name in source)) return
  const original = source[name]
  const wrapped = replacement(original)
  if (typeof wrapped === 'function') {
    source[name] = wrapped
    // nativeTryCatch(() => {
    //   if (!original || !isExistProperty(original, '__MITO__')) {
    //     wrapped.prototype = wrapped.prototype || {}
    //     Object.defineProperty(wrapped, '__MITO__', {
    //       value: original
    //     })
    //   }
    // })
  }
}

/**
 * 用&分割对象，返回a=1&b=2
 * @param obj 需要拼接的对象
 */
export function splitObjToQuery(obj: Record<string, unknown>): string {
  return Object.entries(obj).reduce((result, [key, value], index) => {
    if (index !== 0) {
      result += '&'
    }
    result += `${key}=${value}`
    return result
  }, '')
}

const defaultFunctionName = '<anonymous>'
/**
 * 需要获取函数名，匿名则返回<anonymous>
 * @param {unknown} fn 需要获取函数名的函数本体
 * @returns 返回传入的函数的函数名
 */
export function getFunctionName(fn: unknown): string {
  try {
    if (!fn || typeof fn !== 'function') {
      return defaultFunctionName
    }
    return fn.name || defaultFunctionName
  } catch (e) {
    return defaultFunctionName
  }
}

// 函数防抖
/**
 *
 * @param fn 需要防抖的函数
 * @param delay 防抖的时间间隔
 * @param isImmediate 是否需要立即执行，默认为false，第一次是不执行的
 * @returns 返回一个包含防抖功能的函数
 */
export const debounce = (fn: voidFun, delay: number, isImmediate = false): voidFun => {
  let timer = null
  return function (...args: any) {
    if (isImmediate) {
      fn.apply(this, args)
      isImmediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 函数节流
/**
 *
 * @param fn 需要节流的函数
 * @param delay 节流的时间间隔
 * @returns 返回一个包含节流功能的函数
 */
export const throttle = (fn: Function, delay: number): Function => {
  let canRun = true
  return function (...args: any) {
    if (!canRun) return
    fn.apply(this, args)
    canRun = false
    setTimeout(() => {
      canRun = true
    }, delay)
  }
}

/**
 * 获取当前的时间戳
 * @returns 返回当前时间戳
 */
export function getTimestamp(): number {
  return Date.now()
}
