import { selectRandom } from '@/domain/utils'

describe('selectRandom util', () => {
  test('returns undefined for undefined input', () => {
    expect(selectRandom(undefined)).toBeUndefined()
  })

  test('returns undefined for empty array', () => {
    expect(selectRandom([])).toBeUndefined()
  })

  test('returns the only element for single-item array', () => {
    const arr = [42]
    expect(selectRandom(arr)).toBe(42)
  })

  test('returns one of the items for multi-item array', () => {
    const arr = ['a', 'b', 'c']
    const result = selectRandom(arr)
    expect(arr).toContain(result)
  })
})
