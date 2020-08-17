var MITO = (function () {
  'use strict';

  var ERRORTYPES;
  (function (ERRORTYPES) {
      ERRORTYPES["UNKNOWN"] = "UNKNOWN";
      ERRORTYPES["UNKNOWN_FUNCTION"] = "UNKNOWN_FUNCTION";
      ERRORTYPES["JAVASCRIPT_ERROR"] = "JAVASCRIPT_ERROR";
      ERRORTYPES["BUSINESS_ERROR"] = "BUSINESS_ERROR";
      ERRORTYPES["LOG_ERROR"] = "LOG_ERROR";
      ERRORTYPES["FETCH_ERROR"] = "HTTP_ERROR";
      ERRORTYPES["VUE_ERROR"] = "VUE_ERROR";
      ERRORTYPES["RESOURCE_ERROR"] = "RESOURCE_ERROR";
      ERRORTYPES["PROMISE_ERROR"] = "PROMISE_ERROR";
  })(ERRORTYPES || (ERRORTYPES = {}));
  var ERRORLEVELS;
  (function (ERRORLEVELS) {
      ERRORLEVELS[ERRORLEVELS["CRITICAL"] = 1] = "CRITICAL";
      ERRORLEVELS[ERRORLEVELS["HIGH"] = 2] = "HIGH";
      ERRORLEVELS[ERRORLEVELS["NORMAL"] = 3] = "NORMAL";
      ERRORLEVELS[ERRORLEVELS["LOW"] = 4] = "LOW";
  })(ERRORLEVELS || (ERRORLEVELS = {}));
  var BREADCRUMBTYPES;
  (function (BREADCRUMBTYPES) {
      BREADCRUMBTYPES["ROUTE"] = "Route";
      BREADCRUMBTYPES["CLICK"] = "UI.Click";
      BREADCRUMBTYPES["CONSOLE"] = "Console";
      BREADCRUMBTYPES["XHR"] = "Xhr";
      BREADCRUMBTYPES["FETCH"] = "Fetch";
      BREADCRUMBTYPES["UNHANDLEDREJECTION"] = "Unhandledrejection";
      BREADCRUMBTYPES["VUE"] = "Vue";
      BREADCRUMBTYPES["RESOURCE"] = "Resource";
      BREADCRUMBTYPES["CODE_ERROR"] = "Code Error";
      BREADCRUMBTYPES["CUSTOMER"] = "Customer";
  })(BREADCRUMBTYPES || (BREADCRUMBTYPES = {}));
  var BREADCRUMBCATEGORYS;
  (function (BREADCRUMBCATEGORYS) {
      BREADCRUMBCATEGORYS["HTTP"] = "http";
      BREADCRUMBCATEGORYS["USER"] = "user";
      BREADCRUMBCATEGORYS["DEBUG"] = "debug";
      BREADCRUMBCATEGORYS["EXCEPTION"] = "exception";
  })(BREADCRUMBCATEGORYS || (BREADCRUMBCATEGORYS = {}));
  var EVENTTYPES;
  (function (EVENTTYPES) {
      EVENTTYPES["XHR"] = "xhr";
      EVENTTYPES["FETCH"] = "fetch";
      EVENTTYPES["CONSOLE"] = "console";
      EVENTTYPES["DOM"] = "dom";
      EVENTTYPES["HISTORY"] = "history";
      EVENTTYPES["ERROR"] = "error";
      EVENTTYPES["HASHCHANGE"] = "hashchange";
      EVENTTYPES["UNHANDLEDREJECTION"] = "unhandledrejection";
      EVENTTYPES["MITO"] = "mito";
      EVENTTYPES["VUE"] = "Vue";
  })(EVENTTYPES || (EVENTTYPES = {}));
  var HTTPTYPE;
  (function (HTTPTYPE) {
      HTTPTYPE["XHR"] = "xhr";
      HTTPTYPE["FETCH"] = "fetch";
  })(HTTPTYPE || (HTTPTYPE = {}));
  const ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
  const globalVar = {
      isLogAddBreadcrumb: true,
      crossOriginThreshold: 1000
  };

  function isNodeEnv() {
      return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
  }
  function getGlobal() {
      return (isNodeEnv() ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {});
  }
  const _global = getGlobal();
  const _support = geGlobaltMitoSupport();
  _support.replaceFlag = _support.replaceFlag || {};
  const replaceFlag = _support.replaceFlag;
  function setFlag(replaceType, isSet) {
      if (replaceFlag[replaceType])
          return;
      replaceFlag[replaceType] = isSet;
  }
  function getFlag(replaceType) {
      return replaceFlag[replaceType] ? true : false;
  }
  function geGlobaltMitoSupport() {
      _global.__MITO__ = _global.__MITO__ || {};
      return _global.__MITO__;
  }

  const PREFIX = 'MITO Logger';
  class Logger {
      constructor() {
          this.enabled = true;
          this._console = {};
          const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
          logType.forEach((level) => {
              if (!(level in _global.console))
                  return;
              this._console[level] = _global.console[level];
          });
      }
      disable() {
          this.enabled = false;
      }
      bindOptions(debug) {
          this.enabled = debug ? true : false;
      }
      enable() {
          this.enabled = true;
      }
      log(...args) {
          if (!this.enabled) {
              return;
          }
          this._console.log(`${PREFIX}[Log]:`, ...args);
      }
      warn(...args) {
          if (!this.enabled) {
              return;
          }
          this._console.warn(`${PREFIX}[Warn]:`, ...args);
      }
      error(...args) {
          if (!this.enabled) {
              return;
          }
          this._console.error(`${PREFIX}[Error]:`, ...args);
      }
  }
  const logger = _support.logger || (_support.logger = new Logger());

  function getLocationHref() {
      if (typeof document === 'undefined' || document.location == null)
          return '';
      return document.location.href;
  }
  function on(target, eventName, handler, opitons = false) {
      target.addEventListener(eventName, handler, opitons);
  }
  function replaceOld(source, name, replacement) {
      if (!(name in source))
          return;
      const original = source[name];
      const wrapped = replacement(original);
      if (typeof wrapped === 'function') {
          source[name] = wrapped;
      }
  }
  function splitObjToQuery(obj) {
      return Object.entries(obj).reduce((result, [key, value], index) => {
          if (index !== 0) {
              result += '&';
          }
          result += `${key}=${value}`;
          return result;
      }, '');
  }
  const defaultFunctionName = '<anonymous>';
  function getFunctionName(fn) {
      try {
          if (!fn || typeof fn !== 'function') {
              return defaultFunctionName;
          }
          return fn.name || defaultFunctionName;
      }
      catch (e) {
          return defaultFunctionName;
      }
  }
  const throttle = (fn, delay) => {
      let canRun = true;
      return function (...args) {
          if (!canRun)
              return;
          fn.apply(this, args);
          canRun = false;
          setTimeout(() => {
              canRun = true;
          }, delay);
      };
  };
  function getTimestamp() {
      return Date.now();
  }
  function typeofAny(target, type) {
      return typeof target === type;
  }
  function validateOption(target, targetName, expectType) {
      if (typeofAny(target, expectType))
          return true;
      typeof target !== 'undefined' && logger.error(`${targetName}期望传入${expectType}类型，目前是${typeof target}类型`);
      return false;
  }

  function htmlElementAsString(target) {
      const tagName = target.tagName.toLowerCase();
      if (tagName === 'body') {
          return null;
      }
      let classNames = target.classList.value;
      classNames = classNames !== '' ? ` class="${classNames}"` : '';
      const id = target.id ? ` id="${target.id}` : '';
      const innerText = target.innerText;
      return `<${tagName}${id}${classNames !== '' ? classNames : ''}>${innerText}</${tagName}>`;
  }
  function parseUrlToObj(url) {
      if (!url) {
          return {};
      }
      const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
      if (!match) {
          return {};
      }
      const query = match[6] || '';
      const fragment = match[8] || '';
      return {
          host: match[4],
          path: match[5],
          protocol: match[2],
          relative: match[5] + query + fragment
      };
  }
  function setSilentFlag(opitons = {}) {
      setFlag(EVENTTYPES.XHR, !!opitons.silentXhr);
      setFlag(EVENTTYPES.FETCH, !!opitons.silentFetch);
      setFlag(EVENTTYPES.CONSOLE, !!opitons.silentConsole);
      setFlag(EVENTTYPES.DOM, !!opitons.silentDom);
      setFlag(EVENTTYPES.HISTORY, !!opitons.silentHistory);
      setFlag(EVENTTYPES.ERROR, !!opitons.silentError);
      setFlag(EVENTTYPES.HASHCHANGE, !!opitons.silentHashchange);
      setFlag(EVENTTYPES.UNHANDLEDREJECTION, !!opitons.silentUnhandledrejection);
      setFlag(EVENTTYPES.VUE, !!opitons.silentVue);
  }
  function extractErrorStack(ex, level) {
      const normal = {
          time: getTimestamp(),
          url: getLocationHref(),
          name: ex.name,
          level,
          message: ex.message
      };
      if (typeof ex.stack === 'undefined' || !ex.stack) {
          return normal;
      }
      const chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
      let submatch, parts, element;
      for (let i = 0, j = lines.length; i < j; ++i) {
          if ((parts = chrome.exec(lines[i]))) {
              const isNative = parts[2] && parts[2].indexOf('native') === 0;
              const isEval = parts[2] && parts[2].indexOf('eval') === 0;
              if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                  parts[2] = submatch[1];
                  parts[3] = submatch[2];
                  parts[4] = submatch[3];
              }
              element = {
                  url: !isNative ? parts[2] : null,
                  func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                  args: isNative ? [parts[2]] : [],
                  line: parts[3] ? +parts[3] : null,
                  column: parts[4] ? +parts[4] : null
              };
          }
          else if ((parts = winjs.exec(lines[i]))) {
              element = {
                  url: parts[2],
                  func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                  args: [],
                  line: +parts[3],
                  column: parts[4] ? +parts[4] : null
              };
          }
          else if ((parts = gecko.exec(lines[i]))) {
              const isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
              if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                  parts[3] = submatch[1];
                  parts[4] = submatch[2];
                  parts[5] = null;
              }
              else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                  stack[0].column = ex.columnNumber + 1;
              }
              element = {
                  url: parts[3],
                  func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                  args: parts[2] ? parts[2].split(',') : [],
                  line: parts[4] ? +parts[4] : null,
                  column: parts[5] ? +parts[5] : null
              };
          }
          else {
              continue;
          }
          if (!element.func && element.line) {
              element.func = ERRORTYPES.UNKNOWN_FUNCTION;
          }
          stack.push(element);
      }
      if (!stack.length) {
          return null;
      }
      return {
          ...normal,
          stack: stack
      };
  }

  function nativeTryCatch(fn, errorFn) {
      try {
          fn();
      }
      catch (err) {
          console.log('err', err);
          if (errorFn) {
              errorFn(err);
          }
      }
  }

  function isError(wat) {
      switch (Object.prototype.toString.call(wat)) {
          case '[object Error]':
              return true;
          case '[object Exception]':
              return true;
          case '[object DOMException]':
              return true;
          default:
              return isInstanceOf(wat, Error);
      }
  }
  function isString(wat) {
      return Object.prototype.toString.call(wat) === '[object String]';
  }
  function isInstanceOf(wat, base) {
      try {
          return wat instanceof base;
      }
      catch (_e) {
          return false;
      }
  }
  function isExistProperty(obj, key) {
      return obj.hasOwnProperty(key);
  }

  function supportsHistory() {
      const global = _global;
      const chrome = global.chrome;
      const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
      const hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
      return !isChromePackagedApp && hasHistoryApi;
  }

  class Queue {
      constructor() {
          this.stack = [];
          this.isFlushing = false;
          this.micro = Promise.resolve();
      }
      addFn(fn) {
          if (typeof fn !== 'function')
              return;
          this.stack.push(fn);
          if (!this.isFlushing) {
              this.isFlushing = true;
              this.micro.then(() => this.flushStack());
          }
      }
      flushStack() {
          const temp = this.stack.slice(0);
          this.stack.length = 0;
          this.isFlushing = false;
          for (let i = 0; i < temp.length; i++) {
              temp[i]();
          }
      }
  }

  class Breadcrumb {
      constructor() {
          this.maxBreadcrumbs = 10;
          this.beforePushBreadcrumb = null;
          this.stack = [];
      }
      push(data) {
          if (typeof this.beforePushBreadcrumb === 'function') {
              let result = null;
              globalVar.isLogAddBreadcrumb = false;
              result = this.beforePushBreadcrumb(this, data);
              globalVar.isLogAddBreadcrumb = true;
              if (result) {
                  this.immediatePush(result);
              }
              return;
          }
          this.immediatePush(data);
      }
      immediatePush(data) {
          data.time = getTimestamp();
          if (this.stack.length >= this.maxBreadcrumbs) {
              this.shift();
          }
          this.stack.push(data);
          logger.log(this.stack);
      }
      shift() {
          return this.stack.shift() !== undefined;
      }
      getStack() {
          return this.stack;
      }
      getCategory(type) {
          switch (type) {
              case BREADCRUMBTYPES.XHR:
              case BREADCRUMBTYPES.FETCH:
                  return BREADCRUMBCATEGORYS.HTTP;
              case BREADCRUMBTYPES.CLICK:
              case BREADCRUMBTYPES.ROUTE:
                  return BREADCRUMBCATEGORYS.USER;
              case BREADCRUMBTYPES.CUSTOMER:
              case BREADCRUMBTYPES.CONSOLE:
                  return BREADCRUMBCATEGORYS.DEBUG;
              case BREADCRUMBTYPES.UNHANDLEDREJECTION:
              case BREADCRUMBTYPES.CODE_ERROR:
              case BREADCRUMBTYPES.RESOURCE:
              case BREADCRUMBTYPES.VUE:
              default:
                  return BREADCRUMBCATEGORYS.EXCEPTION;
          }
      }
      bindOptions(options = {}) {
          const { maxBreadcrumbs, beforePushBreadcrumb } = options;
          validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs);
          validateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'function') && (this.beforePushBreadcrumb = beforePushBreadcrumb);
      }
  }
  const breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb());

  const allErrorNumber = {};
  function createErrorId(data) {
      let id;
      const locationUrl = getRealPath(data.url);
      switch (data.type) {
          case ERRORTYPES.FETCH_ERROR:
              id = data.type + data.request.method + data.response.status + getRealPath(data.request.url);
              break;
          case ERRORTYPES.JAVASCRIPT_ERROR:
          case ERRORTYPES.VUE_ERROR:
              id = data.type + data.name + data.message + locationUrl;
              break;
          case ERRORTYPES.BUSINESS_ERROR:
          case ERRORTYPES.LOG_ERROR:
              id = data.type + data.name + data.message + locationUrl + data.info;
              break;
          case ERRORTYPES.PROMISE_ERROR:
              id = data.type + objectOrder(data.message) + locationUrl;
              break;
          default:
              id = data.type + data.message + locationUrl;
              break;
      }
      id = hashCode(id);
      if (typeof allErrorNumber[id] === 'number') {
          allErrorNumber[id]++;
      }
      else {
          allErrorNumber[id] = 1;
      }
      if (allErrorNumber[id] > 3) {
          return null;
      }
      return id;
  }
  function objectOrder(reason) {
      const sortFn = (obj) => {
          return Object.keys(obj)
              .sort()
              .reduce((total, key) => {
              if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
                  total[key] = sortFn(obj[key]);
              }
              else {
                  total[key] = obj[key];
              }
              return total;
          }, {});
      };
      try {
          if (/\{.*\}/.test(reason)) {
              let obj = JSON.parse(reason);
              obj = sortFn(obj);
              return JSON.stringify(obj);
          }
      }
      catch (error) {
          return reason;
      }
  }
  function getRealPath(url) {
      return url.replace(/\?.*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
  }
  function hashCode(str) {
      let hash = 0;
      if (str.length == 0)
          return hash;
      for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
      }
      return hash;
  }

  function httpTransform(data) {
      let description = data.responseText;
      if (data.status === 0) {
          description = data.elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制' : 'http请求失败，失败原因：超时';
      }
      return {
          type: ERRORTYPES.FETCH_ERROR,
          url: getLocationHref(),
          time: data.time,
          elapsedTime: data.elapsedTime,
          level: ERRORLEVELS.HIGH,
          request: {
              httpType: data.type,
              method: data.method,
              url: data.url,
              data: data.reqData || ''
          },
          response: {
              status: data.status,
              statusText: data.statusText,
              description
          }
      };
  }
  const resourceMap = {
      img: '图片',
      script: '脚本'
  };
  function resourceTransform(target) {
      return {
          type: ERRORTYPES.RESOURCE_ERROR,
          url: getLocationHref(),
          message: '资源地址: ' + (target.src || target.href),
          level: ERRORLEVELS.LOW,
          time: getTimestamp(),
          name: `${resourceMap[target.localName] || target.localName} failed to load`
      };
  }

  const SDK_NAME = 'MITO.browser';
  const SDK_VERSION = '1.0.0';
  const SERVER_URL = '//localhost:3000/api/error/error.gif';

  class TransportData {
      constructor(url) {
          this.url = url;
          this.beforeSend = null;
          this.configXhr = null;
          this.version = '0.0.0';
          this.apikey = '';
          this.queue = new Queue();
      }
      imgRequest(data) {
          TransportData.img.src = `${this.url}?${splitObjToQuery(data)}`;
      }
      getRecord() {
          const recordData = _support.record;
          if (recordData && Array.isArray(recordData) && recordData.length > 2) {
              return recordData;
          }
          return [];
      }
      xhrPost(data) {
          const requestFun = () => {
              if (typeof XMLHttpRequest === 'undefined') {
                  return;
              }
              if (typeof this.beforeSend === 'function') {
                  data = this.beforeSend(data);
                  if (!data)
                      return;
              }
              const xhr = new XMLHttpRequest();
              xhr.open('POST', this.url);
              xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
              xhr.withCredentials = true;
              if (typeof this.configXhr === 'function') {
                  this.configXhr(xhr);
              }
              const errorId = createErrorId(data);
              if (!errorId)
                  return;
              data.errorId = errorId;
              xhr.send(JSON.stringify(this.getTransportData(data)));
          };
          this.queue.addFn(requestFun);
      }
      getAuthInfo() {
          return {
              version: this.version,
              apikey: this.apikey
          };
      }
      getTransportData(data) {
          return {
              authInfo: this.getAuthInfo(),
              behavior: breadcrumb.getStack(),
              data,
              record: this.getRecord()
          };
      }
      isSdkTransportUrl(targetUrl) {
          return targetUrl.includes(this.url);
      }
      bindOptions(options = {}) {
          const { dsn, beforeSend, apikey, configXhr } = options;
          validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey);
          validateOption(dsn, 'dsn', 'string') && (this.url = dsn);
          validateOption(beforeSend, 'beforeSend', 'function') && (this.beforeSend = beforeSend);
          validateOption(configXhr, 'configXhr', 'function') && (this.configXhr = configXhr);
      }
  }
  TransportData.img = new Image();
  const transportData = _support.transportData || (_support.transportData = new TransportData(SERVER_URL));

  var Severity;
  (function (Severity) {
      Severity["Else"] = "else";
      Severity["Error"] = "error";
      Severity["Warning"] = "warning";
      Severity["Info"] = "info";
      Severity["Debug"] = "debug";
      Severity["NORMAL"] = "normal";
      Severity["HIGH"] = "high";
      Severity["Critical"] = "critical";
  })(Severity || (Severity = {}));
  (function (Severity) {
      function fromString(level) {
          switch (level) {
              case 'debug':
                  return Severity.Debug;
              case 'info':
              case 'log':
              case 'assert':
                  return Severity.Info;
              case 'warn':
              case 'warning':
                  return Severity.Warning;
              case '1':
              case '2':
              case '3':
              case '4':
              case 'error':
                  return Severity.Error;
              case 'critical':
                  return Severity.Critical;
              default:
                  return Severity.Else;
          }
      }
      Severity.fromString = fromString;
  })(Severity || (Severity = {}));

  const HandleEvents = {
      handleHttp(data, type) {
          const isError = data.status >= 400 || data.status === 0;
          breadcrumb.push({
              type,
              category: breadcrumb.getCategory(type),
              data,
              level: Severity.Info
          });
          if (isError) {
              breadcrumb.push({
                  type,
                  category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                  data,
                  level: Severity.Error
              });
              const result = httpTransform(data);
              transportData.xhrPost(result);
          }
      },
      handleError(errorEvent) {
          const target = errorEvent.target;
          if (target.localName) {
              const data = resourceTransform(errorEvent.target);
              breadcrumb.push({
                  type: BREADCRUMBTYPES.RESOURCE,
                  category: breadcrumb.getCategory(BREADCRUMBTYPES.RESOURCE),
                  data,
                  level: Severity.Error
              });
              return transportData.xhrPost(data);
          }
          const { message, filename, lineno, colno, error } = errorEvent;
          let result;
          if (error && isError(error)) {
              result = extractErrorStack(error, ERRORLEVELS.HIGH);
          }
          else {
              let name = ERRORTYPES.UNKNOWN;
              const url = filename || getLocationHref();
              let msg = message;
              const matches = message.match(ERROR_TYPE_RE);
              if (matches[1]) {
                  name = matches[1];
                  msg = matches[2];
              }
              const element = {
                  url,
                  func: ERRORTYPES.UNKNOWN_FUNCTION,
                  args: ERRORTYPES.UNKNOWN,
                  line: lineno,
                  col: colno
              };
              result = {
                  url,
                  name,
                  message: msg,
                  level: ERRORLEVELS.NORMAL,
                  time: getTimestamp(),
                  stack: [element]
              };
          }
          result.type = ERRORTYPES.JAVASCRIPT_ERROR;
          breadcrumb.push({
              type: BREADCRUMBTYPES.CODE_ERROR,
              category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
              data: result,
              level: Severity.Error
          });
          transportData.xhrPost(result);
      },
      handleHistory(data) {
          const { from, to } = data;
          const { relative: parsedFrom } = parseUrlToObj(from);
          const { relative: parsedTo } = parseUrlToObj(to);
          breadcrumb.push({
              type: BREADCRUMBTYPES.ROUTE,
              category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
              data: {
                  from: parsedFrom ? parsedFrom : '/',
                  to: parsedTo ? parsedTo : '/'
              },
              level: Severity.Info
          });
      },
      handleHashchange(data) {
          const { oldURL, newURL } = data;
          const { relative: from } = parseUrlToObj(oldURL);
          const { relative: to } = parseUrlToObj(newURL);
          breadcrumb.push({
              type: BREADCRUMBTYPES.ROUTE,
              category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
              data: {
                  from,
                  to
              },
              level: Severity.Info
          });
      },
      handleUnhandleRejection(ev) {
          let data = {
              type: ERRORTYPES.PROMISE_ERROR,
              message: JSON.stringify(ev.reason),
              url: getLocationHref(),
              name: ev.type,
              time: getTimestamp(),
              level: ERRORLEVELS.NORMAL
          };
          if (isError(ev.reason)) {
              data = {
                  ...data,
                  ...extractErrorStack(ev.reason, ERRORLEVELS.NORMAL)
              };
          }
          breadcrumb.push({
              type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
              category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
              data: data,
              level: Severity.Error
          });
          transportData.xhrPost(data);
      },
      handleConsole(data) {
          if (globalVar.isLogAddBreadcrumb) {
              breadcrumb.push({
                  type: BREADCRUMBTYPES.CONSOLE,
                  category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
                  data,
                  level: Severity.fromString(data.level)
              });
          }
      }
  };

  const handlers = {};
  const clickThrottle = throttle(triggerHandlers, 600);
  function replace(type) {
      switch (type) {
          case EVENTTYPES.XHR:
              xhrReplace();
              break;
          case EVENTTYPES.FETCH:
              fetchReplace();
              break;
          case EVENTTYPES.ERROR:
              listenError();
              break;
          case EVENTTYPES.CONSOLE:
              replaceConsole();
              break;
          case EVENTTYPES.HISTORY:
              replaceHistory();
              break;
          case EVENTTYPES.UNHANDLEDREJECTION:
              unhandledrejectionReplace();
              break;
          case EVENTTYPES.DOM:
              domReplace();
              break;
          case EVENTTYPES.HASHCHANGE:
              listenHashchange();
              break;
      }
  }
  function addReplaceHandler(handler) {
      if (!handler) {
          return;
      }
      if (getFlag(handler.type))
          return;
      setFlag(handler.type, true);
      handlers[handler.type] = handlers[handler.type] || [];
      handlers[handler.type].push(handler.callback);
      replace(handler.type);
  }
  function triggerHandlers(type, data) {
      if (!type || !handlers[type])
          return;
      handlers[type].forEach((callback) => {
          nativeTryCatch(() => {
              callback(data);
          }, (e) => {
              logger.error(`重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName: ${getFunctionName(callback)}\nError: ${e}`);
          });
      });
  }
  function xhrReplace() {
      if (!('XMLHttpRequest' in _global)) {
          return;
      }
      const originalXhrProto = XMLHttpRequest.prototype;
      replaceOld(originalXhrProto, 'open', (originalOpen) => {
          return function (...args) {
              const url = args[1];
              this.mito_xhr = {
                  method: isString(args[0]) ? args[0].toUpperCase() : args[0],
                  url: args[1],
                  sTime: getTimestamp(),
                  type: HTTPTYPE.XHR
              };
              if (this.mito_xhr.method === 'POST' && transportData.isSdkTransportUrl(url)) {
                  this.mito_xhr.isSdkUrl = true;
              }
              originalOpen.apply(this, args);
          };
      });
      replaceOld(originalXhrProto, 'send', (originalSend) => {
          return function (...args) {
              on(this, 'loadend', function () {
                  if (this.mito_xhr.isSdkUrl)
                      return;
                  this.mito_xhr.reqData = args[0];
                  const eTime = getTimestamp();
                  this.mito_xhr.time = eTime;
                  this.mito_xhr.status = this.status;
                  this.mito_xhr.statusText = this.statusText;
                  this.mito_xhr.responseText = this.responseText;
                  this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime;
                  triggerHandlers(EVENTTYPES.XHR, this.mito_xhr);
              });
              originalSend.apply(this, args);
          };
      });
  }
  function fetchReplace() {
      if (!('fetch' in _global)) {
          return;
      }
      replaceOld(_global, EVENTTYPES.FETCH, (originalFetch) => {
          return function (url, config) {
              const sTime = getTimestamp();
              return originalFetch.apply(_global, [url, config]).then((res) => {
                  const tempRes = res.clone();
                  const eTime = getTimestamp();
                  const handlerData = {
                      elapsedTime: eTime - sTime,
                      type: HTTPTYPE.FETCH,
                      reqData: config && config.body,
                      method: (config && config.method) || 'GET',
                      url,
                      status: tempRes.status,
                      statusText: tempRes.statusText,
                      time: eTime
                  };
                  tempRes.text().then((data) => {
                      handlerData.responseText = data;
                      triggerHandlers(EVENTTYPES.FETCH, handlerData);
                  });
                  return res;
              }, (err) => {
                  const eTime = getTimestamp();
                  const handlerData = {
                      elapsedTime: eTime - sTime,
                      type: HTTPTYPE.FETCH,
                      method: (config && config.method) || 'GET',
                      reqData: config && config.body,
                      url: url,
                      status: 0,
                      statusText: err.name + err.message,
                      time: eTime
                  };
                  triggerHandlers(EVENTTYPES.FETCH, handlerData);
                  throw err;
              });
          };
      });
  }
  function listenHashchange() {
      if (!isExistProperty(_global, 'onpopstate')) {
          on(_global, EVENTTYPES.HASHCHANGE, function (e) {
              triggerHandlers(EVENTTYPES.HASHCHANGE, e);
          });
      }
  }
  function listenError() {
      on(_global, 'error', function (e) {
          triggerHandlers(EVENTTYPES.ERROR, e);
      }, true);
  }
  function replaceConsole() {
      if (!('console' in _global)) {
          return;
      }
      const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
      logType.forEach(function (level) {
          if (!(level in _global.console)) {
              return;
          }
          replaceOld(_global.console, level, function (originalConsole) {
              return function (...args) {
                  if (originalConsole) {
                      triggerHandlers(EVENTTYPES.CONSOLE, { args, level });
                      originalConsole.apply(_global.console, args);
                  }
              };
          });
      });
  }
  let lastHref;
  lastHref = getLocationHref();
  function replaceHistory() {
      if (!supportsHistory())
          return;
      const oldOnpopstate = _global.onpopstate;
      _global.onpopstate = function (...args) {
          const to = getLocationHref();
          const from = lastHref;
          triggerHandlers(EVENTTYPES.HISTORY, {
              from,
              to
          });
          oldOnpopstate && oldOnpopstate.apply(this, args);
      };
      function historyReplaceFn(originalHistoryFn) {
          return function (...args) {
              const url = args.length > 2 ? args[2] : undefined;
              if (url) {
                  const from = lastHref;
                  const to = String(url);
                  lastHref = to;
                  triggerHandlers(EVENTTYPES.HISTORY, {
                      from,
                      to
                  });
              }
              return originalHistoryFn.apply(this, args);
          };
      }
      replaceOld(_global.history, 'pushState', historyReplaceFn);
      replaceOld(_global.history, 'replaceState', historyReplaceFn);
  }
  function unhandledrejectionReplace() {
      on(_global, EVENTTYPES.UNHANDLEDREJECTION, function (ev) {
          triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, ev);
      });
  }
  function domReplace() {
      if (!('document' in _global))
          return;
      on(_global.document, 'click', function () {
          clickThrottle(EVENTTYPES.DOM, {
              category: 'click',
              data: this
          });
      }, true);
      const proto = EventTarget && EventTarget.prototype;
      if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
          return;
      }
      replaceOld(proto, 'addEventListener', function (originalAddEventListener) {
          return function (eventName, fn, options) {
              const wrapperListner = (...args) => {
                  try {
                      return fn.apply(this, args);
                  }
                  catch (error) {
                      console.log('wrapperListner', error);
                      throw error;
                  }
              };
              return originalAddEventListener.call(this, eventName, wrapperListner, options);
          };
      });
  }

  function log({ info = 'emptyMsg', level = ERRORLEVELS.CRITICAL, ex = '', type = ERRORTYPES.BUSINESS_ERROR }) {
      let errorInfo = {};
      if (isError(ex)) {
          errorInfo = extractErrorStack(ex, level);
      }
      const error = {
          ...errorInfo,
          type,
          info,
          level,
          url: getLocationHref()
      };
      breadcrumb.push({
          type: BREADCRUMBTYPES.CUSTOMER,
          data: info,
          level: Severity.fromString(level.toString())
      });
      transportData.xhrPost(error);
  }

  function formatComponentName(vm) {
      if (vm.$root === vm)
          return 'root';
      const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
      return ((name ? 'component <' + name + '>' : 'anonymous component') +
          (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : ''));
  }
  function handleVueError(err, vm, info, level, breadcrumbLevel) {
      const componentName = formatComponentName(vm);
      const propsData = vm.$options && vm.$options.propsData;
      const data = {
          type: ERRORTYPES.VUE_ERROR,
          message: `${err.message}(${info})`,
          level,
          url: getLocationHref(),
          componentName: componentName,
          propsData: propsData || '',
          name: err.name,
          stack: err.stack || [],
          time: getTimestamp()
      };
      breadcrumb.push({
          type: BREADCRUMBTYPES.VUE,
          category: breadcrumb.getCategory(BREADCRUMBTYPES.VUE),
          data,
          level: breadcrumbLevel
      });
      transportData.xhrPost(data);
  }

  const hasConsole = typeof console !== 'undefined';
  const MitoVue = {
      install(Vue) {
          if (getFlag(EVENTTYPES.VUE) || !Vue || !Vue.config)
              return;
          setFlag(EVENTTYPES.VUE, true);
          Vue.config.errorHandler = function (err, vm, info) {
              handleVueError.apply(null, [err, vm, info, ERRORLEVELS.NORMAL, Severity.Error]);
              if (hasConsole && !Vue.config.silent) {
                  console.error('Error in ' + info + ': "' + err.toString() + '"', vm);
                  console.error(err);
              }
          };
          Vue.config.warnHandler = function (msg, vm, trace) {
              handleVueError.apply(null, [msg, vm, trace, ERRORLEVELS.NORMAL, Severity.Warning]);
              hasConsole && console.error('[Vue warn]: ' + msg + trace);
          };
      }
  };

  function setupReplace() {
      addReplaceHandler({
          callback: (data) => {
              HandleEvents.handleHttp(data, BREADCRUMBTYPES.XHR);
          },
          type: EVENTTYPES.XHR
      });
      addReplaceHandler({
          callback: (data) => {
              HandleEvents.handleHttp(data, BREADCRUMBTYPES.FETCH);
          },
          type: EVENTTYPES.FETCH
      });
      addReplaceHandler({
          callback: (error) => {
              HandleEvents.handleError(error);
          },
          type: EVENTTYPES.ERROR
      });
      addReplaceHandler({
          callback: (data) => {
              HandleEvents.handleConsole(data);
          },
          type: EVENTTYPES.CONSOLE
      });
      addReplaceHandler({
          callback: (data) => {
              HandleEvents.handleHistory(data);
          },
          type: EVENTTYPES.HISTORY
      });
      addReplaceHandler({
          callback: (data) => {
              HandleEvents.handleUnhandleRejection(data);
          },
          type: EVENTTYPES.UNHANDLEDREJECTION
      });
      addReplaceHandler({
          callback: (data) => {
              const htmlString = htmlElementAsString(data.data.activeElement);
              if (htmlString) {
                  breadcrumb.push({
                      type: BREADCRUMBTYPES.CLICK,
                      category: breadcrumb.getCategory(BREADCRUMBTYPES.CLICK),
                      data: htmlString,
                      level: Severity.Info
                  });
              }
          },
          type: EVENTTYPES.DOM
      });
      addReplaceHandler({
          callback: (e) => {
              HandleEvents.handleHashchange(e);
          },
          type: EVENTTYPES.HASHCHANGE
      });
  }

  function init(options = {}) {
      if (options.disabled)
          return;
      bindOptions(options);
      setupReplace();
  }
  function bindOptions(options = {}) {
      setSilentFlag(options);
      breadcrumb.bindOptions(options);
      logger.bindOptions(options.debug);
      transportData.bindOptions(options);
  }
  var index = { MitoVue, SDK_VERSION, SDK_NAME, init, log };

  return index;

}());
