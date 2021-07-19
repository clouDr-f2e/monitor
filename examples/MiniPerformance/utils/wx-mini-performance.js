/* @mitojs/wx-mini-performance version ' + 2.1.18 */
'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b
      }) ||
    function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
    }
  return extendStatics(d, b)
}
function __extends(d, b) {
  if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
  extendStatics(d, b)
  function __() {
    this.constructor = d
  }
  d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
}
var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value)
        })
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value))
      } catch (e) {
        reject(e)
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this
      }),
    g
  )
  function verb(n) {
    return function (v) {
      return step([n, v])
    }
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t
        if (((y = 0), t)) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0:
          case 1:
            t = op
            break
          case 4:
            _.label++
            return { value: op[1], done: false }
          case 5:
            _.label++
            y = op[1]
            op = [0]
            continue
          case 7:
            op = _.ops.pop()
            _.trys.pop()
            continue
          default:
            if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
              _ = 0
              continue
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1]
              break
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1]
              t = op
              break
            }
            if (t && _.label < t[2]) {
              _.label = t[2]
              _.ops.push(op)
              break
            }
            if (t[2]) _.ops.pop()
            _.trys.pop()
            continue
        }
        op = body.call(thisArg, _)
      } catch (e) {
        op = [6, e]
        y = 0
      } finally {
        f = t = 0
      }
    if (op[0] & 5) throw op[1]
    return { value: op[0] ? op[1] : void 0, done: true }
  }
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
  return r
}

var ERRORTYPES
;(function (ERRORTYPES) {
  ERRORTYPES['UNKNOWN'] = 'UNKNOWN'
  ERRORTYPES['UNKNOWN_FUNCTION'] = 'UNKNOWN_FUNCTION'
  ERRORTYPES['JAVASCRIPT_ERROR'] = 'JAVASCRIPT_ERROR'
  ERRORTYPES['LOG_ERROR'] = 'LOG_ERROR'
  ERRORTYPES['FETCH_ERROR'] = 'HTTP_ERROR'
  ERRORTYPES['VUE_ERROR'] = 'VUE_ERROR'
  ERRORTYPES['REACT_ERROR'] = 'REACT_ERROR'
  ERRORTYPES['RESOURCE_ERROR'] = 'RESOURCE_ERROR'
  ERRORTYPES['PROMISE_ERROR'] = 'PROMISE_ERROR'
  ERRORTYPES['ROUTE_ERROR'] = 'ROUTE_ERROR'
})(ERRORTYPES || (ERRORTYPES = {}))
var WxAppEvents
;(function (WxAppEvents) {
  WxAppEvents['AppOnLaunch'] = 'AppOnLaunch'
  WxAppEvents['AppOnShow'] = 'AppOnShow'
  WxAppEvents['AppOnHide'] = 'AppOnHide'
  WxAppEvents['AppOnError'] = 'AppOnError'
  WxAppEvents['AppOnPageNotFound'] = 'AppOnPageNotFound'
  WxAppEvents['AppOnUnhandledRejection'] = 'AppOnUnhandledRejection'
})(WxAppEvents || (WxAppEvents = {}))
var WxPageEvents
;(function (WxPageEvents) {
  WxPageEvents['PageOnLoad'] = 'PageOnLoad'
  WxPageEvents['PageOnShow'] = 'PageOnShow'
  WxPageEvents['PageOnHide'] = 'PageOnHide'
  WxPageEvents['PageOnReady'] = 'PageOnReady'
  WxPageEvents['PageOnUnload'] = 'PageOnUnload'
  WxPageEvents['PageOnShareAppMessage'] = 'PageOnShareAppMessage'
  WxPageEvents['PageOnShareTimeline'] = 'PageOnShareTimeline'
  WxPageEvents['PageOnTabItemTap'] = 'PageOnTabItemTap'
})(WxPageEvents || (WxPageEvents = {}))
var WxRouteEvents
;(function (WxRouteEvents) {
  WxRouteEvents['SwitchTab'] = 'switchTab'
  WxRouteEvents['ReLaunch'] = 'reLaunch'
  WxRouteEvents['RedirectTo'] = 'redirectTo'
  WxRouteEvents['NavigateTo'] = 'navigateTo'
  WxRouteEvents['NavigateBack'] = 'navigateBack'
  WxRouteEvents['NavigateToMiniProgram'] = 'navigateToMiniProgram'
  WxRouteEvents['RouteFail'] = 'routeFail'
})(WxRouteEvents || (WxRouteEvents = {}))
__assign(__assign(__assign({}, WxAppEvents), WxPageEvents), ERRORTYPES)
var BREADCRUMBTYPES
;(function (BREADCRUMBTYPES) {
  BREADCRUMBTYPES['ROUTE'] = 'Route'
  BREADCRUMBTYPES['CLICK'] = 'UI.Click'
  BREADCRUMBTYPES['CONSOLE'] = 'Console'
  BREADCRUMBTYPES['XHR'] = 'Xhr'
  BREADCRUMBTYPES['FETCH'] = 'Fetch'
  BREADCRUMBTYPES['UNHANDLEDREJECTION'] = 'Unhandledrejection'
  BREADCRUMBTYPES['VUE'] = 'Vue'
  BREADCRUMBTYPES['REACT'] = 'React'
  BREADCRUMBTYPES['RESOURCE'] = 'Resource'
  BREADCRUMBTYPES['CODE_ERROR'] = 'Code Error'
  BREADCRUMBTYPES['CUSTOMER'] = 'Customer'
  BREADCRUMBTYPES['APP_ON_SHOW'] = 'App On Show'
  BREADCRUMBTYPES['APP_ON_LAUNCH'] = 'App On Launch'
  BREADCRUMBTYPES['APP_ON_HIDE'] = 'App On Hide'
  BREADCRUMBTYPES['PAGE_ON_SHOW'] = 'Page On Show'
  BREADCRUMBTYPES['PAGE_ON_HIDE'] = 'Page On Hide'
  BREADCRUMBTYPES['PAGE_ON_SHARE_APP_MESSAGE'] = 'Page On Share App Message'
  BREADCRUMBTYPES['PAGE_ON_SHARE_TIMELINE'] = 'Page On Share Timeline'
  BREADCRUMBTYPES['PAGE_ON_TAB_ITEM_TAP'] = 'Page On Tab Item Tap'
  BREADCRUMBTYPES['TAP'] = 'UI.Tap'
  BREADCRUMBTYPES['TOUCHMOVE'] = 'UI.Touchmove'
})(BREADCRUMBTYPES || (BREADCRUMBTYPES = {}))
var BREADCRUMBCATEGORYS
;(function (BREADCRUMBCATEGORYS) {
  BREADCRUMBCATEGORYS['HTTP'] = 'http'
  BREADCRUMBCATEGORYS['USER'] = 'user'
  BREADCRUMBCATEGORYS['DEBUG'] = 'debug'
  BREADCRUMBCATEGORYS['EXCEPTION'] = 'exception'
  BREADCRUMBCATEGORYS['LIFECYCLE'] = 'lifecycle'
})(BREADCRUMBCATEGORYS || (BREADCRUMBCATEGORYS = {}))
var EVENTTYPES
;(function (EVENTTYPES) {
  EVENTTYPES['XHR'] = 'xhr'
  EVENTTYPES['FETCH'] = 'fetch'
  EVENTTYPES['CONSOLE'] = 'console'
  EVENTTYPES['DOM'] = 'dom'
  EVENTTYPES['HISTORY'] = 'history'
  EVENTTYPES['ERROR'] = 'error'
  EVENTTYPES['HASHCHANGE'] = 'hashchange'
  EVENTTYPES['UNHANDLEDREJECTION'] = 'unhandledrejection'
  EVENTTYPES['MITO'] = 'mito'
  EVENTTYPES['VUE'] = 'Vue'
  EVENTTYPES['MINI_ROUTE'] = 'miniRoute'
  EVENTTYPES['MINI_PERFORMANCE'] = 'miniPerformance'
  EVENTTYPES['MINI_MEMORY_WARNING'] = 'miniMemoryWarning'
  EVENTTYPES['MINI_NETWORK_STATUS_CHANGE'] = 'miniNetworkStatusChange'
  EVENTTYPES['MINI_BATTERY_INFO'] = 'miniBatteryInfo'
})(EVENTTYPES || (EVENTTYPES = {}))
var HTTPTYPE
;(function (HTTPTYPE) {
  HTTPTYPE['XHR'] = 'xhr'
  HTTPTYPE['FETCH'] = 'fetch'
})(HTTPTYPE || (HTTPTYPE = {}))
var HTTP_CODE
;(function (HTTP_CODE) {
  HTTP_CODE[(HTTP_CODE['BAD_REQUEST'] = 400)] = 'BAD_REQUEST'
  HTTP_CODE[(HTTP_CODE['UNAUTHORIZED'] = 401)] = 'UNAUTHORIZED'
  HTTP_CODE[(HTTP_CODE['INTERNAL_EXCEPTION'] = 500)] = 'INTERNAL_EXCEPTION'
})(HTTP_CODE || (HTTP_CODE = {}))

var nativeToString = Object.prototype.toString
function isType(type) {
  return function (value) {
    return nativeToString.call(value) === '[object ' + type + ']'
  }
}
var variableTypeDetection = {
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
function isEmptyObject(obj) {
  return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0)
var isWxMiniEnv =
  variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
  variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0)
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0)
function getGlobal() {
  if (isBrowserEnv) return window
  if (isWxMiniEnv) return wx
  if (isNodeEnv) return process
}
var _global = getGlobal()
var _support = getGlobalMitoSupport()
_support.replaceFlag = _support.replaceFlag || {}
_support.replaceFlag
function getGlobalMitoSupport() {
  _global.__MITO__ = _global.__MITO__ || {}
  return _global.__MITO__
}

var PREFIX = 'MITO Logger'
var Logger = (function () {
  function Logger() {
    var _this = this
    this.enabled = false
    this._console = {}
    _global.console = console || _global.console
    if (console || _global.console) {
      var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
      logType.forEach(function (level) {
        if (!(level in _global.console)) return
        _this._console[level] = _global.console[level]
      })
    }
  }
  Logger.prototype.disable = function () {
    this.enabled = false
  }
  Logger.prototype.bindOptions = function (debug) {
    this.enabled = debug ? true : false
  }
  Logger.prototype.enable = function () {
    this.enabled = true
  }
  Logger.prototype.getEnableStatus = function () {
    return this.enabled
  }
  Logger.prototype.log = function () {
    var _a
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!this.enabled) {
      return
    }
    ;(_a = this._console).log.apply(_a, __spreadArrays([PREFIX + '[Log]:'], args))
  }
  Logger.prototype.warn = function () {
    var _a
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!this.enabled) {
      return
    }
    ;(_a = this._console).warn.apply(_a, __spreadArrays([PREFIX + '[Warn]:'], args))
  }
  Logger.prototype.error = function () {
    var _a
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!this.enabled) {
      return
    }
    ;(_a = this._console).error.apply(_a, __spreadArrays([PREFIX + '[Error]:'], args))
  }
  return Logger
})()
var logger = _support.logger || (_support.logger = new Logger())

function replaceOld(source, name, replacement, isForced) {
  if (isForced === void 0) {
    isForced = false
  }
  if (source === undefined) return
  if (name in source || isForced) {
    var original = source[name]
    var wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}
function typeofAny(target, type) {
  return typeof target === type
}
function toStringAny(target, type) {
  return nativeToString.call(target) === type
}
function validateOption(target, targetName, expectType) {
  if (typeofAny(target, expectType)) return true
  typeof target !== 'undefined' &&
    logger.error(
      targetName + '\u671F\u671B\u4F20\u5165' + expectType + '\u7C7B\u578B\uFF0C\u76EE\u524D\u662F' + typeof target + '\u7C7B\u578B'
    )
  return false
}
function toStringValidateOption(target, targetName, expectType) {
  if (toStringAny(target, expectType)) return true
  typeof target !== 'undefined' &&
    logger.error(
      targetName +
        '\u671F\u671B\u4F20\u5165' +
        expectType +
        '\u7C7B\u578B\uFF0C\u76EE\u524D\u662F' +
        nativeToString.call(target) +
        '\u7C7B\u578B'
    )
  return false
}
function generateUUID() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
function setUrlQuery(url, query) {
  var queryArr = []
  Object.keys(query).forEach(function (k) {
    queryArr.push(k + '=' + query[k])
  })
  if (url.indexOf('?') !== -1) {
    url = url + '&' + queryArr.join('&')
  } else {
    url = url + '?' + queryArr.join('&')
  }
  return url
}

var Severity
;(function (Severity) {
  Severity['Else'] = 'else'
  Severity['Error'] = 'error'
  Severity['Warning'] = 'warning'
  Severity['Info'] = 'info'
  Severity['Debug'] = 'debug'
  Severity['Low'] = 'low'
  Severity['Normal'] = 'normal'
  Severity['High'] = 'high'
  Severity['Critical'] = 'critical'
})(Severity || (Severity = {}))
;(function (Severity) {
  function fromString(level) {
    switch (level) {
      case 'debug':
        return Severity.Debug
      case 'info':
      case 'log':
      case 'assert':
        return Severity.Info
      case 'warn':
      case 'warning':
        return Severity.Warning
      case Severity.Low:
      case Severity.Normal:
      case Severity.High:
      case Severity.Critical:
      case 'error':
        return Severity.Error
      default:
        return Severity.Else
    }
  }
  Severity.fromString = fromString
})(Severity || (Severity = {}))

var SpanStatus
;(function (SpanStatus) {
  SpanStatus['Ok'] = 'ok'
  SpanStatus['DeadlineExceeded'] = 'deadline_exceeded'
  SpanStatus['Unauthenticated'] = 'unauthenticated'
  SpanStatus['PermissionDenied'] = 'permission_denied'
  SpanStatus['NotFound'] = 'not_found'
  SpanStatus['ResourceExhausted'] = 'resource_exhausted'
  SpanStatus['InvalidArgument'] = 'invalid_argument'
  SpanStatus['Unimplemented'] = 'unimplemented'
  SpanStatus['Unavailable'] = 'unavailable'
  SpanStatus['InternalError'] = 'internal_error'
  SpanStatus['UnknownError'] = 'unknown_error'
  SpanStatus['Cancelled'] = 'cancelled'
  SpanStatus['AlreadyExists'] = 'already_exists'
  SpanStatus['FailedPrecondition'] = 'failed_precondition'
  SpanStatus['Aborted'] = 'aborted'
  SpanStatus['OutOfRange'] = 'out_of_range'
  SpanStatus['DataLoss'] = 'data_loss'
})(SpanStatus || (SpanStatus = {}))

var _a$1
var EListenerTypes
;(function (EListenerTypes) {
  EListenerTypes['Touchmove'] = 'touchmove'
  EListenerTypes['Tap'] = 'tap'
  EListenerTypes['LongTap'] = 'longtap'
  EListenerTypes['LongPress'] = 'longpress'
})(EListenerTypes || (EListenerTypes = {}))
var STORAGE_KEY = {
  deviceId: 'mito--uuid'
}
var WxPerformanceDataType
;(function (WxPerformanceDataType) {
  WxPerformanceDataType['MEMORY_WARNING'] = 'MEMORY_WARNING'
  WxPerformanceDataType['WX_PERFORMANCE'] = 'WX_PERFORMANCE'
  WxPerformanceDataType['WX_NETWORK'] = 'WX_NETWORK'
  WxPerformanceDataType['WX_LIFE_STYLE'] = 'WX_LIFE_STYLE'
  WxPerformanceDataType['WX_USER_ACTION'] = 'WX_USER_ACTION'
})(WxPerformanceDataType || (WxPerformanceDataType = {}))
var WxPerformanceItemType
;(function (WxPerformanceItemType) {
  WxPerformanceItemType['MemoryWarning'] = 'WxMemory'
  WxPerformanceItemType['Performance'] = 'WxPerformance'
  WxPerformanceItemType['Network'] = 'WxNetwork'
  WxPerformanceItemType['AppOnLaunch'] = 'AppOnLaunch'
  WxPerformanceItemType['AppOnShow'] = 'AppOnShow'
  WxPerformanceItemType['AppOnHide'] = 'AppOnHide'
  WxPerformanceItemType['AppOnError'] = 'AppOnError'
  WxPerformanceItemType['AppOnPageNotFound'] = 'AppOnPageNotFound'
  WxPerformanceItemType['AppOnUnhandledRejection'] = 'AppOnUnhandledRejection'
  WxPerformanceItemType['PageOnLoad'] = 'PageOnLoad'
  WxPerformanceItemType['PageOnShow'] = 'PageOnShow'
  WxPerformanceItemType['PageOnHide'] = 'PageOnHide'
  WxPerformanceItemType['PageOnReady'] = 'PageOnReady'
  WxPerformanceItemType['PageOnUnload'] = 'PageOnUnload'
  WxPerformanceItemType['PageOnShareAppMessage'] = 'PageOnShareAppMessage'
  WxPerformanceItemType['PageOnShareTimeline'] = 'PageOnShareTimeline'
  WxPerformanceItemType['PageOnTabItemTap'] = 'PageOnTabItemTap'
  WxPerformanceItemType['WaterFallFinish'] = 'WaterFallFinish'
  WxPerformanceItemType['UserTap'] = 'WxUserTap'
  WxPerformanceItemType['UserTouchMove'] = 'WxUserTouchMove'
  WxPerformanceItemType['WxRequest'] = 'WxRequest'
  WxPerformanceItemType['WxUploadFile'] = 'WxUploadFile'
  WxPerformanceItemType['WxDownloadFile'] = 'WxDownloadFile'
  WxPerformanceItemType['WxCustomPaint'] = 'WxCustomPaint'
})(WxPerformanceItemType || (WxPerformanceItemType = {}))
var WxListenerTypes =
  ((_a$1 = {}),
  (_a$1[EListenerTypes.Tap] = WxPerformanceItemType.UserTap),
  (_a$1[EListenerTypes.Touchmove] = WxPerformanceItemType.UserTouchMove),
  _a$1)

var _a
function pushLife(store, itemType) {
  store.push(WxPerformanceDataType.WX_LIFE_STYLE, { itemType: itemType, timestamp: Date.now() })
}
function pushAction(store, data) {
  store.push(WxPerformanceDataType.WX_USER_ACTION, __assign(__assign({}, data), { timestamp: Date.now() }))
}
function pushNetwork(store, data) {
  store.push(WxPerformanceDataType.WX_NETWORK, __assign(__assign({}, data), { timestamp: Date.now() }))
}
var Events =
  ((_a = {}),
  (_a[WxPerformanceItemType.AppOnLaunch] = function (args) {
    var _this = this
    var now = Date.now()
    _this.setLaunchTime(now)
    _this.push(WxPerformanceDataType.WX_LIFE_STYLE, { itemType: WxPerformanceItemType.AppOnLaunch, timestamp: now })
  }),
  (_a[WxPerformanceItemType.AppOnShow] = function () {
    pushLife(this, WxPerformanceItemType.AppOnShow)
  }),
  (_a[WxPerformanceItemType.PageOnLoad] = function () {
    pushLife(this, WxPerformanceItemType.PageOnLoad)
  }),
  (_a[WxPerformanceItemType.PageOnReady] = function () {
    pushLife(this, WxPerformanceItemType.PageOnReady)
  }),
  (_a[WxPerformanceItemType.PageOnUnload] = function () {
    pushLife(this, WxPerformanceItemType.PageOnUnload)
  }),
  (_a[WxPerformanceItemType.UserTap] = function (event) {
    pushAction(this, __assign(__assign({}, event), { itemType: WxPerformanceItemType.UserTap }))
  }),
  (_a[WxPerformanceItemType.UserTouchMove] = function (event) {
    pushAction(this, __assign(__assign({}, event), { itemType: WxPerformanceItemType.UserTouchMove }))
  }),
  (_a[WxPerformanceItemType.WxRequest] = function (data) {
    pushNetwork(this, data)
  }),
  (_a[WxPerformanceItemType.WxDownloadFile] = function (data) {
    pushNetwork(this, data)
  }),
  (_a[WxPerformanceItemType.WxUploadFile] = function (data) {
    pushNetwork(this, data)
  }),
  _a)

function replaceApp(store) {
  if (App) {
    var originApp_1 = App
    App = function (appOptions) {
      var methods = Object.keys(Events).filter(function (m) {
        return m.indexOf('App') !== -1
      })
      methods.forEach(function (method) {
        replaceOld(
          appOptions,
          method.replace('AppOn', 'on'),
          function (originMethod) {
            return function () {
              var args = []
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i]
              }
              if (originMethod) {
                originMethod.apply(this, args)
              }
              store.emit(method, args)
            }
          },
          true
        )
      })
      return originApp_1(appOptions)
    }
  }
}
function replacePageLifeMethods(options, store) {
  var pageLifeMethods = Object.keys(Events).filter(function (m) {
    return m.indexOf('Page') !== -1
  })
  pageLifeMethods.forEach(function (method) {
    replaceOld(
      options,
      method.replace('PageOn', 'on'),
      function (originMethod) {
        return function () {
          var args = []
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i]
          }
          store.emit(method, args)
          if (originMethod) {
            return originMethod.apply(this, args)
          }
        }
      },
      true
    )
  })
}
function replaceAction(options, store) {
  var ListenerTypes = Object.keys(WxListenerTypes)
  if (options) {
    Object.keys(options).forEach(function (m) {
      if ('function' !== typeof options[m]) {
        return
      }
      replaceOld(
        options,
        m,
        function (originMethod) {
          return function () {
            var args = []
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i]
            }
            var event = args.find(function (arg) {
              return arg && arg.type && arg.currentTarget
            })
            if (event && !event.mitoWorked && ListenerTypes.indexOf(event.type) > -1) {
              store.emit(WxListenerTypes[event.type], event)
              event.mitoWorked = true
            }
            return originMethod.apply(this, args)
          }
        },
        true
      )
    })
  }
}
function replacePage(store) {
  if (!Page) {
    return
  }
  var originPage = Page
  Page = function (pageOptions) {
    replacePageLifeMethods(pageOptions, store)
    replaceAction(pageOptions, store)
    return originPage.call(this, pageOptions)
  }
}
function replaceComponent(store) {
  if (!Component) {
    return
  }
  var originComponent = Component
  Component = function (componentOptions) {
    if (!isEmptyObject(componentOptions.methods)) {
      replacePageLifeMethods(componentOptions.methods, store)
      replaceAction(componentOptions, store)
    }
    return originComponent.call(this, componentOptions)
  }
}
function replaceNetwork(store) {
  var HOOKS = {
    request: WxPerformanceItemType.WxRequest,
    downloadFile: WxPerformanceItemType.WxDownloadFile,
    uploadFile: WxPerformanceItemType.WxUploadFile
  }
  Object.keys(HOOKS).forEach(function (hook) {
    var originRequest = wx[hook]
    Object.defineProperty(wx, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        var options = args[0]
        var url = options.url
        if (store.filterUrl(url)) {
          return originRequest.call(this, options)
        }
        var reqData = {
          startTime: Date.now(),
          header: options.header || {},
          url: options.url
        }
        switch (hook) {
          case 'request':
            var method = options.method
            reqData = __assign(__assign({}, reqData), { method: method })
            break
          case 'downloadFile':
          case 'uploadFile':
            var filePath = options.filePath
            reqData = __assign(__assign({}, reqData), { filePath: filePath, method: hook === 'downloadFile' ? 'GET' : 'POST' })
            break
        }
        console.log('reqData = ', reqData)
        var originFail = options.fail
        var _fail = function (err) {
          var endTime = Date.now()
          reqData.duration = endTime - reqData.startTime
          reqData.status = 0
          reqData.errMsg = err.errMsg
          reqData.endTime = endTime
          store.emit(HOOKS[hook], reqData)
          if (typeof originFail === 'function') {
            return originFail(err)
          }
        }
        var originSuccess = options.success
        var _success = function (res) {
          var endTime = Date.now()
          reqData.duration = endTime - reqData.startTime
          reqData.status = res.statusCode
          reqData.errMsg = res.errMsg
          reqData.endTime = endTime
          store.emit(HOOKS[hook], reqData)
          if (typeof originSuccess === 'function') {
            return originSuccess(res)
          }
        }
        return originRequest.call(this, __assign(__assign({}, options), { success: _success, fail: _fail }))
      }
    })
  })
}

function initMemoryWarning(store, need) {
  if (!need) return
  wx.onMemoryWarning(function (res) {
    store.push(WxPerformanceDataType.MEMORY_WARNING, res)
  })
}
function noNetworkType(option) {
  return
}
function initNetworkInfo(store, need) {
  store.getNetworkType = need ? wx.getNetworkType : noNetworkType
}
function noBatteryInfo() {
  return {
    level: '0',
    isCharging: false
  }
}
function initBatteryInfo(store, need) {
  store.getBatteryInfo = need ? wx.getBatteryInfoSync : noBatteryInfo
}
function initWxPerformance(store) {
  var performance = wx.getPerformance()
  var observer = performance.createObserver(function (entryList) {
    store.push(WxPerformanceDataType.WX_PERFORMANCE, entryList.getEntries())
  })
  observer.observe({ entryTypes: ['navigation', 'render', 'script'] })
}
function initWxHideReport(store, immediately, onAppHideReport) {
  if (immediately || !onAppHideReport) return
  wx.onAppHide(function () {
    store.reportLeftData()
  })
}
function initWxNetwork(store) {
  for (var k in Events) {
    store.on(k, Events[k])
  }
  replaceApp(store)
  replacePage(store)
  replaceComponent(store)
  replaceNetwork(store)
}

function noop() {}
function getDeviceId() {
  var deviceId = wx.getStorageSync(STORAGE_KEY.deviceId)
  if (!deviceId) {
    var deviceId_1 = generateUUID()
    wx.setStorageSync(STORAGE_KEY.deviceId, deviceId_1)
  }
  return deviceId
}
function getPageUrl(setQuery) {
  if (setQuery === void 0) {
    setQuery = true
  }
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  var pages = getCurrentPages()
  if (!pages.length) {
    return 'App'
  }
  var page = pages[pages.length - 1]
  return setQuery ? setUrlQuery(page.route, page.options) : page.route
}

var Event = (function () {
  function Event() {
    this.events = new Map()
  }
  Event.prototype.on = function (event, listener) {
    var ls = this.events.get(event) || []
    ls.push(listener)
    this.events.set(event, ls)
    return this
  }
  Event.prototype.emit = function (event) {
    var _this = this
    var args = []
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i]
    }
    if (!this.events.has(event)) return false
    var ls = this.events.get(event) || []
    ls.forEach(function (fn) {
      return fn.apply(_this, args)
    })
    return true
  }
  Event.prototype.remove = function (event, listener) {
    var ls = this.events.get(event) || []
    var es = ls.filter(function (f) {
      return f !== listener
    })
    this.events.set(event, es)
    return this
  }
  Event.prototype.removeAll = function (event) {
    this.events.delete(event)
    return this
  }
  Event.prototype.once = function (event, listener) {
    var _this = this
    var fn = function () {
      var arg = []
      for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i]
      }
      listener.apply(_this, arg)
      _this.remove(event, fn)
    }
    return this.on(event, fn)
  }
  return Event
})()

var Store = (function (_super) {
  __extends(Store, _super)
  function Store(options) {
    var _this = _super.call(this) || this
    _this.firstAction = false
    _this.navigationMap = {}
    var appId = options.appId,
      report = options.report,
      maxBreadcrumbs = options.maxBreadcrumbs,
      immediately = options.immediately,
      ignoreUrl = options.ignoreUrl
    validateOption(appId, 'appId', 'string') && (_this.appId = appId)
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (_this.maxBreadcrumbs = maxBreadcrumbs)
    toStringValidateOption(ignoreUrl, 'ignoreUrl', '[object RegExp]') && (_this.ignoreUrl = ignoreUrl)
    validateOption(immediately, 'immediately', 'boolean') && (_this.immediately = immediately)
    _this.report = validateOption(report, 'report', 'function') ? report : noop
    _this.stack = []
    return _this
  }
  Store.prototype._pushData = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.immediately) {
          this.report(data)
          return [2]
        }
        this.stack = this.stack.concat(data)
        if (this.stack.length >= this.maxBreadcrumbs) {
          this.reportLeftData()
        }
        return [2]
      })
    })
  }
  Store.prototype.reportLeftData = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.report(__spreadArrays(this.stack))
        this.stack = []
        return [2]
      })
    })
  }
  Store.prototype._getSystemInfo = function () {
    !this.systemInfo && (this.systemInfo = wx.getSystemInfoSync())
    return this.systemInfo
  }
  Store.prototype._getNetworkType = function () {
    return __awaiter(this, void 0, void 0, function () {
      var nk, err_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            nk = { networkType: 'none', errMsg: '' }
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, this.getNetworkType()]
          case 2:
            nk = _a.sent()
            return [3, 4]
          case 3:
            err_1 = _a.sent()
            console.warn('getNetworkType err = ', err_1)
            return [3, 4]
          case 4:
            return [2, nk.networkType]
        }
      })
    })
  }
  Store.prototype._createPerformanceData = function (type, item) {
    return __awaiter(this, void 0, void 0, function () {
      var networkType, date
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this._getNetworkType()]
          case 1:
            networkType = _a.sent()
            date = new Date()
            return [
              2,
              {
                appId: this.appId,
                timestamp: date.getTime(),
                time: date.toLocaleString(),
                uuid: generateUUID(),
                deviceId: getDeviceId(),
                networkType: networkType,
                batteryLevel: this.getBatteryInfo().level,
                systemInfo: this._getSystemInfo(),
                wxLaunch: this.wxLaunchTime,
                page: getPageUrl(),
                type: type,
                item: item
              }
            ]
        }
      })
    })
  }
  Store.prototype.push = function (type, data) {
    switch (type) {
      case WxPerformanceDataType.WX_LIFE_STYLE:
      case WxPerformanceDataType.WX_NETWORK:
        this.simpleHandle(type, data)
        break
      case WxPerformanceDataType.MEMORY_WARNING:
        this.handleMemoryWarning(data)
        break
      case WxPerformanceDataType.WX_PERFORMANCE:
        this.handleWxPerformance(data)
        break
      case WxPerformanceDataType.WX_USER_ACTION:
        this.handleWxAction(data)
    }
  }
  Store.prototype.simpleHandle = function (type, data) {
    return __awaiter(this, void 0, void 0, function () {
      var d
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this._createPerformanceData(type, [data])]
          case 1:
            d = _a.sent()
            this._pushData([d])
            return [2]
        }
      })
    })
  }
  Store.prototype.handleMemoryWarning = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var d
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              this._createPerformanceData(WxPerformanceDataType.MEMORY_WARNING, [
                __assign(__assign({}, data), { itemType: WxPerformanceItemType.MemoryWarning, timestamp: Date.now() })
              ])
            ]
          case 1:
            d = _a.sent()
            this.report([d])
            return [2]
        }
      })
    })
  }
  Store.prototype.buildNavigationStart = function (entry) {
    if (entry.entryType === 'navigation') {
      this.navigationMap[entry.path] = entry.navigationStart || entry.startTime
    }
  }
  Store.prototype.handleWxPerformance = function (data) {
    if (data === void 0) {
      data = []
    }
    return __awaiter(this, void 0, void 0, function () {
      var _data, item
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _data = data.map(function (d) {
              _this.buildNavigationStart(d)
              d.itemType = WxPerformanceItemType.Performance
              d.timestamp = Date.now()
              return d
            })
            return [4, this._createPerformanceData(WxPerformanceDataType.WX_PERFORMANCE, _data)]
          case 1:
            item = _a.sent()
            this._pushData([item])
            return [2]
        }
      })
    })
  }
  Store.prototype.handleWxAction = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var d
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!!this.firstAction) return [3, 2]
            return [4, this._createPerformanceData(WxPerformanceDataType.WX_USER_ACTION, [data])]
          case 1:
            d = _a.sent()
            this._pushData([d])
            this.firstAction = true
            _a.label = 2
          case 2:
            return [2]
        }
      })
    })
  }
  Store.prototype.setLaunchTime = function (now) {
    this.wxLaunchTime = now
  }
  Store.prototype.filterUrl = function (url) {
    if (this.ignoreUrl && this.ignoreUrl.test(url)) return true
    return false
  }
  Store.prototype.customPaint = function () {
    var _this = this
    var now = Date.now()
    var path = getPageUrl(false)
    setTimeout(function () {
      return __awaiter(_this, void 0, void 0, function () {
        var navigationStart, data
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(path && this.navigationMap[path])) return [3, 2]
              navigationStart = this.navigationMap[path]
              return [
                4,
                this._createPerformanceData(WxPerformanceDataType.WX_LIFE_STYLE, [
                  {
                    itemType: WxPerformanceItemType.WxCustomPaint,
                    navigationStart: navigationStart,
                    timestamp: now,
                    duration: now - navigationStart
                  }
                ])
              ]
            case 1:
              data = _a.sent()
              this._pushData([data])
              _a.label = 2
            case 2:
              return [2]
          }
        })
      })
    }, 1000)
  }
  return Store
})(Event)

var version = '2.1.18'

var WxPerformance = (function () {
  function WxPerformance(options) {
    if (!isWxMiniEnv) {
      return
    }
    var appId = options.appId,
      report = options.report,
      _a = options.immediately,
      immediately = _a === void 0 ? true : _a,
      ignoreUrl = options.ignoreUrl,
      _b = options.maxBreadcrumbs,
      maxBreadcrumbs = _b === void 0 ? 10 : _b,
      _c = options.needNetworkStatus,
      needNetworkStatus = _c === void 0 ? true : _c,
      _d = options.needBatteryInfo,
      needBatteryInfo = _d === void 0 ? true : _d,
      _e = options.needMemoryWarning,
      needMemoryWarning = _e === void 0 ? true : _e,
      _f = options.onAppHideReport,
      onAppHideReport = _f === void 0 ? true : _f
    this.appId = appId
    this.version = version
    var store = new Store({ appId: appId, report: report, immediately: immediately, ignoreUrl: ignoreUrl, maxBreadcrumbs: maxBreadcrumbs })
    this.store = store
    initBatteryInfo(store, needBatteryInfo)
    initNetworkInfo(store, needNetworkStatus)
    initMemoryWarning(store, needMemoryWarning)
    initWxHideReport(store, immediately, onAppHideReport)
    initWxPerformance(store)
    initWxNetwork(store)
  }
  WxPerformance.prototype.customPaint = function () {
    this.store.customPaint()
  }
  return WxPerformance
})()

exports.WxPerformance = WxPerformance
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=wx-mini-performance.js.map
