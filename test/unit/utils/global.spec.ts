import { EVENTTYPES } from '@mito/common'
import { init } from '@mito/browser'
import { getFlag, getGlobal, getGlobalMitoSupport, isBrowserEnv, isNodeEnv, isWxMiniEnv, setFlag, supportsHistory } from '@mito/utils'

describe('global.ts', () => {
  it('should getGLoabl func work', () => {
    const _window = getGlobal()
    expect(_window).toBe(window)
  })
  it('should setFlag and getFlag work', () => {
    expect(getFlag(EVENTTYPES.DOM)).toBeFalsy()
    setFlag(EVENTTYPES.DOM, true)
    expect(getFlag(EVENTTYPES.DOM)).toBeTruthy()
  })
  it('should getGlobalMitoSupport func work', () => {
    init({ maxBreadcrumbs: 16 })
    const __MITO__ = getGlobalMitoSupport()
    expect(__MITO__).toBeDefined()
    expect(__MITO__.breadcrumb).toBeDefined()
  })

  it('should env variable work', () => {
    expect(isNodeEnv).toBeTruthy()
    expect(isWxMiniEnv).toBeFalsy()
    // mock browser env by node
    expect(isBrowserEnv).toBeTruthy()
  })

  // it('should supportsHistory func work', () => {
  //   expect(supportsHistory()).toBeTruthy()
  // })
})
