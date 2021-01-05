export const nativeToString = Object.prototype.toString
function isType(type: string) {
  return function (value: any): boolean {
    return nativeToString.call(value) === `[object ${type}]`
  }
}

/**
 * 检测变量类型
 * @param type
 */
export const variableTypeDetection = {
  isNumber: isType('Number'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isNull: isType('Null'),
  isUndefined: isType('Undefined'),
  isSymbol: isType('Symbol'),
  isFunction: isType('Function'),
  isObject: isType('Object'),
  isArray: isType('Array'),
  isProcess: isType('process'),
  isWindow: isType('Window')
}

/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {../link isError}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
export function isError(wat: any): boolean {
  switch (nativeToString.call(wat)) {
    case '[object Error]':
      return true
    case '[object Exception]':
      return true
    case '[object DOMException]':
      return true
    default:
      return isInstanceOf(wat, Error)
  }
}

/**
 * Checks whether given value's type is ErrorEvent
 * {../link isErrorEvent}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
// export function isErrorEvent(wat: any): boolean {
//   return nativeToString.call(wat) === '[object ErrorEvent]'
// }

/**
 * Checks whether given value's type is DOMError
 * {../link isDOMError}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
// export function isDOMError(wat: any): boolean {
//   return nativeToString.call(wat) === '[object DOMError]'
// }

/**
 * Checks whether given value's type is DOMException
 * {../link isDOMException}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
// export function isDOMException(wat: any): boolean {
//   return nativeToString.call(wat) === '[object DOMException]'
// }

/**
 * Checks whether given value's is a primitive (undefined, null, number, boolean, string)
 * {../link isPrimitive}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
export function isPrimitive(wat: any): boolean {
  return wat === null || (typeof wat !== 'object' && typeof wat !== 'function')
}

/**
 * 检查是否是空对象
 * ../param obj 待检测的对象
 */
export function isEmptyObject(obj: Object): boolean {
  return Object.keys(obj).length === 0
}

export function isEmpty(wat: any): boolean {
  return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null
}

/**
 * Checks whether given value's type is an Event instance
 * {../link isEvent}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
export function isEvent(wat: any): boolean {
  // tslint:disable-next-line:strict-type-predicates
  return typeof Event !== 'undefined' && isInstanceOf(wat, Event)
}

/**
 * Checks whether given value's type is an Element instance
 * {../link isElement}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
export function isElement(wat: any): boolean {
  // tslint:disable-next-line:strict-type-predicates
  return typeof Element !== 'undefined' && isInstanceOf(wat, Element)
}

/**
 * Checks whether given value has a then function.
 * ../param wat A value to be checked.
 */
export function isThenable(wat: any): boolean {
  // tslint:disable:no-unsafe-any
  return Boolean(wat && wat.then && typeof wat.then === 'function')
  // tslint:enable:no-unsafe-any
}

/**
 * Checks whether given value's type is an instance of provided constructor.
 * {../link isInstanceOf}.
 *
 * ../param wat A value to be checked.
 * ../param base A constructor to be used in a check.
 * ../returns A boolean representing the result.
 */
export function isInstanceOf(wat: any, base: any): boolean {
  try {
    // tslint:disable-next-line:no-unsafe-any
    return wat instanceof base
  } catch (_e) {
    return false
  }
}

export function isExistProperty(obj: Object, key: string | number | symbol): boolean {
  return obj.hasOwnProperty(key)
}
