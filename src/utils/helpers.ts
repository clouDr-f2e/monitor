import { IAnyObject, IntegrationError } from '../types/common'
import { voidFun, globalVar, HTTP_CODE, ERRORTYPES } from '../common/constant'
import { logger } from './logger'
import { nativeToString, variableTypeDetection } from './is'

export function getLocationHref(): string {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}

// 用到所有事件名称
type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap

/**
 * 添加事件监听器
 *
 * ../export
 * ../param {{ addEventListener: Function }} target
 * ../param {keyof TotalEventName} eventName
 * ../param {Function} handler
 * ../param {(boolean | Object)} opitons
 * ../returns
 */
export function on(target: { addEventListener: Function }, eventName: TotalEventName, handler: Function, opitons: boolean | unknown = false): void {
  target.addEventListener(eventName, handler, opitons)
}

/**
 *
 * 重写对象上面的某个属性
 * ../param source 需要被重写的对象
 * ../param name 需要被重写对象的key
 * ../param replacement 以原有的函数作为参数，执行并重写原有函数
 * ../returns void
 */
export function replaceOld(source: IAnyObject, name: string, replacement: (...args: any[]) => any, isForced = false): void {
  if (name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}

/**
 * 用&分割对象，返回a=1&b=2
 * ../param obj 需要拼接的对象
 */
// export function splitObjToQuery(obj: Record<string, unknown>): string {
//   return Object.entries(obj).reduce((result, [key, value], index) => {
//     if (index !== 0) {
//       result += '&'
//     }
//     result += `${key}=${value}`
//     return result
//   }, '')
// }

export const defaultFunctionName = '<anonymous>'
/**
 * 需要获取函数名，匿名则返回<anonymous>
 * ../param {unknown} fn 需要获取函数名的函数本体
 * ../returns 返回传入的函数的函数名
 */
export function getFunctionName(fn: unknown): string {
  if (!fn || typeof fn !== 'function') {
    return defaultFunctionName
  }
  return fn.name || defaultFunctionName
}

// 函数防抖
/**
 *
 * ../param fn 需要防抖的函数
 * ../param delay 防抖的时间间隔
 * ../param isImmediate 是否需要立即执行，默认为false，第一次是不执行的
 * ../returns 返回一个包含防抖功能的函数
 */
// export const debounce = (fn: voidFun, delay: number, isImmediate = false): voidFun => {
//   let timer = null
//   return function (...args: any) {
//     if (isImmediate) {
//       fn.apply(this, args)
//       isImmediate = false
//       return
//     }
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }

// 函数节流
/**
 *
 * ../param fn 需要节流的函数
 * ../param delay 节流的时间间隔
 * ../returns 返回一个包含节流功能的函数
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
 * ../returns 返回当前时间戳
 */
export function getTimestamp(): number {
  return Date.now()
}

export function typeofAny(target: any, type: string): boolean {
  return typeof target === type
}

export function toStringAny(target: any, type: string): boolean {
  return nativeToString.call(target) === type
}

export function validateOption(target: any, targetName: string, expectType: string): boolean {
  if (typeofAny(target, expectType)) return true
  typeof target !== 'undefined' && logger.error(`${targetName}期望传入${expectType}类型，目前是${typeof target}类型`)
  return false
}

export function toStringValidateOption(target: any, targetName: string, expectType: string): boolean {
  if (toStringAny(target, expectType)) return true
  typeof target !== 'undefined' && logger.error(`${targetName}期望传入${expectType}类型，目前是${nativeToString.call(target)}类型`)
  return false
}

export function slientConsoleScope(callback: Function) {
  globalVar.isLogAddBreadcrumb = false
  callback()
  globalVar.isLogAddBreadcrumb = true
}

export function generateUUID(): string {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export function unknownToString(target: unknown): string {
  if (variableTypeDetection.isString(target)) {
    return target as string
  }
  return JSON.stringify(target)
}

export function getBigVersion(version: string) {
  return Number(version.split('.')[0])
}

export function isHttpFail(code: number) {
  return code === 0 || code === HTTP_CODE.BAD_REQUEST || code > HTTP_CODE.UNAUTHORIZED
}

/**
 * 给url添加query
 * @param url
 * @param query
 */
export function setUrlQuery(url: string, query: object) {
  const queryArr = []
  Object.keys(query).forEach((k) => {
    queryArr.push(`${k}=${query[k]}`)
  })
  if (url.indexOf('?') !== -1) {
    url = `${url}&${queryArr.join('&')}`
  } else {
    url = `${url}?${queryArr.join('&')}`
  }
  return url
}
/**
 * 解析字符串错误信息，返回message、name、stacks
 * @param str error string
 */
export function parseErrorString(str: string): IntegrationError {
  const splitLine: string[] = str.split('\n')
  if (splitLine.length < 2) return null
  if (splitLine[0].indexOf('MiniProgramError') !== -1) {
    splitLine.splice(0, 1)
  }
  const message = splitLine.splice(0, 1)[0]
  const name = splitLine.splice(0, 1)[0].split(':')[0]
  const stacks = []
  splitLine.forEach((errorLine: string) => {
    const regexpGetFun = /at\s+([\S]+)\s+\(/ // 获取 [ 函数名 ]
    const regexGetFile = /\(([^)]+)\)/ // 获取 [ 有括号的文件 , 没括号的文件 ]
    const regexGetFileNoParenthese = /\s+at\s+(\S+)/ // 获取 [ 有括号的文件 , 没括号的文件 ]

    const funcExec = regexpGetFun.exec(errorLine)
    let fileURLExec = regexGetFile.exec(errorLine)
    if (!fileURLExec) {
      // 假如为空尝试解析无括号的URL
      fileURLExec = regexGetFileNoParenthese.exec(errorLine)
    }

    const funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : ''
    const fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : ''
    const lineInfo = fileURLMatch.split(':')
    stacks.push({
      args: [], // 请求参数
      func: funcNameMatch || ERRORTYPES.UNKNOWN_FUNCTION, // 前端分解后的报错
      column: Number(lineInfo.pop()), // 前端分解后的列
      line: Number(lineInfo.pop()), // 前端分解后的行
      url: lineInfo.join(':') // 前端分解后的URL
    })
  })
  return {
    message,
    name,
    stacks
  }
}
