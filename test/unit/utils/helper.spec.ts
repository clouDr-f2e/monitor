import { getBigVersion, getLocationHref, on } from '@/utils'

describe('helper.ts', () => {
  it('should getBigVersion func work', () => {
    expect(getBigVersion('0.6.1')).toBe(0)
    expect(getBigVersion('2.6.1')).toBe(2)
    expect(getBigVersion('3.0.4')).toBe(3)
  })
  it('should getLocationHref func work', () => {
    expect(getLocationHref()).toBe('http://localhost/')
  })
  it('should on func work', () => {
    const div = document.createElement('div')
    let flag = false
    on(div, 'click', () => {
      flag = true
    })
    div.click()
    expect(flag).toBeTruthy()
  })
})
