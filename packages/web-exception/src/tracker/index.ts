/**
 * @file 监控用户动作信息
 * */
import { ActionTrackerOptions, BREADCRUMB_CATEGORY, BREADCRUMB_TYPES, BreadcrumbData } from '../types';

const defaultOptions = {
  maxBreadcrumbs: 10
}

export class ActionTracker {
  options: ActionTrackerOptions
  queue: BreadcrumbData[] = []
  constructor(options: ActionTrackerOptions = defaultOptions) {
    this.options = { ...options, ...defaultOptions };
    this.trackClick();
  }

  push(data: Omit<BreadcrumbData, 'category' | 'time'>) {
    if (this.queue.length >= this.options.maxBreadcrumbs) {
      this.queue.shift()
    }
    this.queue.push({ ...data, category: this.getCategory(data.type), time: Date.now() })
  }

  trackClick() {
    document.body.addEventListener('click', (e) => {
      const { target } = e
      if (target instanceof Element) {
        this.push({
          type: BREADCRUMB_TYPES.CLICK,
          data: target.outerHTML,
        })
      }
    })
  }

  trackRoute() {}

  trackConsole() {}

  getCategory(type: string) {
    switch (type) {
      case BREADCRUMB_TYPES.XHR:
      case BREADCRUMB_TYPES.FETCH:
        return BREADCRUMB_CATEGORY.HTTP
      case BREADCRUMB_TYPES.CLICK:
      case BREADCRUMB_TYPES.ROUTE:
      case BREADCRUMB_TYPES.TAP:
      case BREADCRUMB_TYPES.TOUCHMOVE:
        return BREADCRUMB_CATEGORY.USER
      case BREADCRUMB_TYPES.CUSTOMER:
      case BREADCRUMB_TYPES.CONSOLE:
        return BREADCRUMB_CATEGORY.DEBUG
      case BREADCRUMB_TYPES.UNHANDLEDREJECTION:
      case BREADCRUMB_TYPES.CODE_ERROR:
      case BREADCRUMB_TYPES.RESOURCE:
      case BREADCRUMB_TYPES.VUE:
      case BREADCRUMB_TYPES.REACT:
      default:
        return BREADCRUMB_CATEGORY.EXCEPTION
    }
  }
}
