import { matchesPreRequire } from '@/domain/utils'

const baseScene = (overrides = {}) => ({
  id: 's',
  title: 't',
  content: 'c',
  choices: [],
  preRequire: {},
  ...overrides,
})

describe('matchesPreRequire', () => {
  it('accepts undefined preRequire', () => {
    const scene = baseScene()
    expect(matchesPreRequire(scene, undefined as any)).toBe(true)
  })

  it('matches itemsRequired.any as OR', () => {
    const scene = baseScene({ preRequire: { itemsRequired: { any: ['Mochila'] } } })
    expect(matchesPreRequire(scene, { itemsRequired: { any: ['Mochila', 'Nanotraje'] } })).toBe(
      true
    )
    expect(matchesPreRequire(scene, { itemsRequired: { any: ['Nanotraje'] } })).toBe(false)
  })

  it('matches itemsRequired.all requires all items', () => {
    const scene = baseScene({ preRequire: { itemsRequired: { all: ['Mochila', 'Nanotraje'] } } })
    expect(matchesPreRequire(scene, { itemsRequired: { all: ['Mochila'] } })).toBe(true)
    expect(matchesPreRequire(scene, { itemsRequired: { all: ['Mochila', 'Nanotraje'] } })).toBe(
      true
    )
    expect(matchesPreRequire(scene, { itemsRequired: { all: ['Outro'] } })).toBe(false)
  })

  it('matches hours requirement', () => {
    const scene = baseScene({ preRequire: { hours: [1, 2, 3] } })
    expect(matchesPreRequire(scene, { hours: [2] })).toBe(true)
    expect(matchesPreRequire(scene, { hours: [4] })).toBe(false)
  })

  it('matches skillsRequired', () => {
    const scene = baseScene({ preRequire: { skillsRequired: ['SkillA'] } })
    expect(matchesPreRequire(scene, { skillsRequired: ['SkillA'] })).toBe(true)
    expect(matchesPreRequire(scene, { skillsRequired: ['SkillB'] })).toBe(false)
  })

  it('matches xpRequired entries', () => {
    const scene = baseScene({ preRequire: { xpRequired: [{ target: 'combat', min: 10 }] } })
    expect(matchesPreRequire(scene, { xpRequired: [{ target: 'combat', min: 10 }] } as any)).toBe(
      true
    )
    expect(matchesPreRequire(scene, { xpRequired: [{ target: 'combat', min: 5 }] } as any)).toBe(
      false
    )
  })

  it('matches statsRequired entries', () => {
    const scene = baseScene({ preRequire: { statsRequired: [{ stat: 'strength', min: 3 }] } })
    expect(matchesPreRequire(scene, { statsRequired: [{ stat: 'strength', min: 3 }] } as any)).toBe(
      true
    )
    expect(matchesPreRequire(scene, { statsRequired: [{ stat: 'strength', min: 4 }] } as any)).toBe(
      false
    )
  })
})
