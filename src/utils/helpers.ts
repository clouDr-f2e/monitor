import { EVENTTYPES, voidFun } from '@/common'
import { Breadcrumb, TransportData } from 'core'
import { Logger, logger } from './logger'

export function getLocationHref(): string {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}

// 用到所有事件名称
type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap

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

export function typeofAny(target: any, type: string): boolean {
  return typeof target === type
}

export function validateOption(target: any, targetName: string, expectType: string): boolean {
  if (typeofAny(target, expectType)) return true
  typeof target !== 'undefined' && logger.error(`${targetName}期望传入${expectType}类型，目前是${typeof target}类型`)
  return false
}
