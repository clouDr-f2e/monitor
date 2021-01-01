import { getBigVersion } from '@/utils'

describe('utils/helper.ts', () => {
  it('should getBigVersion work', () => {
    expect(getBigVersion('0.6.1')).toBe(0)
    expect(getBigVersion('2.6.1')).toBe(2)
    expect(getBigVersion('3.0.4')).toBe(3)
  })
})
