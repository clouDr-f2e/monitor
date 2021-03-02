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
 * 检查是否是空对象
 * ../param obj 待检测的对象
 */
export function isEmptyObject(obj: Object): boolean {
  return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0
}

export function isEmpty(wat: any): boolean {
  return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null
}

/**
 * Checks whether given value has a then function.
 * ../param wat A value to be checked.
 */
// export function isThenable(wat: any): boolean {
//   // tslint:disable:no-unsafe-any
//   return Boolean(wat && wat.then && typeof wat.then === 'function')
//   // tslint:enable:no-unsafe-any
// }

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
