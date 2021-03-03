import { IAnyObject } from '@mito/types'

export interface VueInstance {
  config?: VueConfiguration
  mixin(hooks: { [key: string]: () => void }): void
  util: {
    warn(...input: any): void
  }
  version: string
}
export interface VueConfiguration {
  silent: boolean
  errorHandler(err: Error, vm: ViewModel, info: string): void
  warnHandler(msg: string, vm: ViewModel, trace: string): void
  ignoredElements: (string | RegExp)[]
  keyCodes: { [key: string]: number | number[] }
  async: boolean
}
export interface ViewModel {
  [key: string]: any
  $root: Record<string, unknown>
  $options: {
    [key: string]: any
    name?: string
    // vue2.6
    propsData?: IAnyObject
    _componentTag?: string
    __file?: string
    props?: IAnyObject
  }
  $props: Record<string, unknown>
}
