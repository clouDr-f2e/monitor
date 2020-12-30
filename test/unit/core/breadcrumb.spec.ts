import { BREADCRUMBCATEGORYS, BREADCRUMBTYPES } from '@/common'
import { breadcrumb } from '@/core/breadcrumb'
import { BreadcrumbPushData } from '@/types'
import { Severity } from '@/utils/Severity'

describe('breadcrumb.ts', () => {
  beforeAll(() => {
    breadcrumb.bindOptions({
      maxBreadcrumbs: 16
    })
  })
  afterEach(() => {
    breadcrumb.clear()
  })

  const breadcrumbDemo: BreadcrumbPushData = {
    category: BREADCRUMBCATEGORYS.DEBUG,
    type: BREADCRUMBTYPES.CONSOLE,
    data: 'unit',
    level: Severity.Debug
  }

  it("breadcrumb's max lenght is less than 16", () => {
    new Array(20).fill('').forEach(() => breadcrumb.push(breadcrumbDemo))
    expect(breadcrumb.getStack().length === 16)
  })

  it('beforePushBreadcrumb should work', () => {
    breadcrumb.bindOptions({
      beforePushBreadcrumb(breadcrumb, hint) {
        if (hint.category === BREADCRUMBCATEGORYS.DEBUG) {
          return false
        }
        return hint
      }
    })
    breadcrumb.push(breadcrumbDemo)
    expect(breadcrumb.getStack().length).toBe(0)
    breadcrumbDemo.category = BREADCRUMBCATEGORYS.HTTP
    breadcrumb.push(breadcrumbDemo)
    expect(breadcrumb.getStack().length).toBe(1)
  })

  it('breadcrumb.getCategory should work', () => {
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.XHR)).toBe(BREADCRUMBCATEGORYS.HTTP)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.FETCH)).toBe(BREADCRUMBCATEGORYS.HTTP)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.CLICK)).toBe(BREADCRUMBCATEGORYS.USER)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE)).toBe(BREADCRUMBCATEGORYS.USER)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.CUSTOMER)).toBe(BREADCRUMBCATEGORYS.DEBUG)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.CUSTOMER)).toBe(BREADCRUMBCATEGORYS.DEBUG)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.RESOURCE)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.VUE)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(breadcrumb.getCategory(BREADCRUMBTYPES.REACT)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
  })
})
