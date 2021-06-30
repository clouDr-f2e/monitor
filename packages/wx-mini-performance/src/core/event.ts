class Event {
  events: Map<WxPerformanceItemType | string, Array<Listener>>
  constructor() {
    this.events = new Map()
  }
  on(event: WxPerformanceItemType | string, listener: (...args: any[]) => void): this {
    let ls = this.events.get(event) || []
    ls.push(listener)
    this.events.set(event, ls)
    return this
  }
  emit(event: WxPerformanceItemType | string, ...args: any[]): boolean {
    if (!this.events.has(event)) return false
    let ls = this.events.get(event) || []
    ls.forEach((fn) => fn.apply(this, args))
    return true
  }
  remove(event: WxPerformanceItemType | string, listener: (...args: any[]) => void): this {
    const ls = this.events.get(event) || []
    const es = ls.filter((f) => f !== listener)
    this.events.set(event, es)
    return this
  }
  removeAll(event: WxPerformanceItemType): this {
    this.events.delete(event)
    return this
  }
  once(event: WxPerformanceItemType | string, listener: (...args: any[]) => void): this {
    const fn = (...arg: any[]) => {
      listener.apply(this, arg)
      this.remove(event, fn)
    }
    return this.on(event, fn)
  }
}

export default Event
