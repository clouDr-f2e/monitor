import { EVENTTYPES, ERRORTYPES, ERRORLEVELS } from '@/common'
import { getLocationHref, getTimestamp } from './helpers'
import { setFlag } from './global'
import { InitOptions } from '@/types/options'
import { ReportDataType } from '@/types/transportData'

/**
 * 获取当前script标签的apiKey属性值
 */
export function getApiKey(): undefined | string {
  const s = document.querySelector('script[apiKey]')
  if (s) {
    return s.getAttribute('apiKey')
  }
  return undefined
}

/**
 * 返回包含id、class、innerTextde字符串的标签
 * @param target html节点
 */
export function htmlElementAsString(target: HTMLElement): string {
  const tagName = target.tagName.toLowerCase()
  if (tagName === 'body') {
    return null
  }
  let classNames = target.classList.value
  classNames = classNames !== '' ? ` class="${classNames}"` : ''
  const id = target.id ? ` id="${target.id}` : ''
  const innerText = target.innerText
  return `<${tagName}${id}${classNames !== '' ? classNames : ''}>${innerText}</${tagName}>`
}

/**
 * 将地址字符串转换成对象
 * @returns 返回一个对象
 */
export function parseUrlToObj(
  url: string
): {
  host?: string
  path?: string
  protocol?: string
  relative?: string
} {
  if (!url) {
    return {}
  }

  const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/)

  if (!match) {
    return {}
  }

  // coerce to undefined values to empty string so we don't get 'undefined'
  const query = match[6] || ''
  const fragment = match[8] || ''
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment // everything minus origin
  }
}

export function setSilentFlag(opitons: InitOptions = {}) {
  setFlag(EVENTTYPES.XHR, !!opitons.silentXhr)
  setFlag(EVENTTYPES.FETCH, !!opitons.silentFetch)
  setFlag(EVENTTYPES.CONSOLE, !!opitons.silentConsole)
  setFlag(EVENTTYPES.DOM, !!opitons.silentDom)
  setFlag(EVENTTYPES.HISTORY, !!opitons.silentHistory)
  setFlag(EVENTTYPES.ERROR, !!opitons.silentError)
  setFlag(EVENTTYPES.HASHCHANGE, !!opitons.silentHashchange)
  setFlag(EVENTTYPES.UNHANDLEDREJECTION, !!opitons.silentUnhandledrejection)
  setFlag(EVENTTYPES.VUE, !!opitons.silentVue)
}

// 复用老的sdk，用来解析error的stack，并返回args、column、line、func、url:
export function extractErrorStack(ex: any, level: ERRORLEVELS): ReportDataType {
  const normal = {
    time: getTimestamp(),
    url: getLocationHref(),
    name: ex.name,
    level,
    message: ex.message
  }
  if (typeof ex.stack === 'undefined' || !ex.stack) {
    return normal
  }

  let chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
    winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    // Used to additionally parse URL/line/column from eval frames
    geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    lines = ex.stack.split('\n'),
    stack = [],
    submatch,
    parts,
    element,
    reference = /^(.*) is undefined$/.exec(ex.message)

  for (let i = 0, j = lines.length; i < j; ++i) {
    if ((parts = chrome.exec(lines[i]))) {
      let isNative = parts[2] && parts[2].indexOf('native') === 0 // start of line
      let isEval = parts[2] && parts[2].indexOf('eval') === 0 // start of line
      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1] // url
        parts[3] = submatch[2] // line
        parts[4] = submatch[3] // column
      }
      element = {
        url: !isNative ? parts[2] : null,
        func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      }
    } else if ((parts = winjs.exec(lines[i]))) {
      element = {
        url: parts[2],
        func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      }
    } else if ((parts = gecko.exec(lines[i]))) {
      let isEval = parts[3] && parts[3].indexOf(' > eval') > -1
      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        // throw out eval line/column and use top-most line number
        parts[3] = submatch[1]
        parts[4] = submatch[2]
        parts[5] = null // no column when eval
      } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
        // FireFox uses this awesome columnNumber property for its top frame
        // Also note, Firefox's column number is 0-based and everything else expects 1-based,
        // so adding 1
        // NOTE: this hack doesn't work if top-most frame is eval
        stack[0].column = ex.columnNumber + 1
      }
      element = {
        url: parts[3],
        func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      }
    } else {
      continue
    }

    if (!element.func && element.line) {
      element.func = ERRORTYPES.UNKNOWN_FUNCTION
    }

    stack.push(element)
  }

  if (!stack.length) {
    return null
  }

  return {
    ...normal,
    stack: stack
  }
}
