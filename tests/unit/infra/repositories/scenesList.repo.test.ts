import { matchesPreRequire } from '@/domain/utils'

const baseScene = (overrides = {}) => ({
  id: Math.random().toString(36).slice(2),
  title: 'Cena teste',
  content: 'Conteúdo',
  choices: [],
  preRequire: {},
  ...overrides,
})

describe('scenesList repo - getScenesByPreRequire', () => {
  it('returns all scenes when preRequire is undefined (pure match)', () => {
    const s1 = baseScene()
    const s2 = baseScene({ title: '2' })

    const scenes = [s1, s2]

    const res = scenes.filter((s) => matchesPreRequire(s, undefined as any))
    expect(res.length).toBe(2)
  })

  it('matches itemsRequired.any as OR (at least one) (pure match)', () => {
    const sceneWithA = baseScene({ preRequire: { itemsRequired: { any: ['Mochila'] } } })
    const sceneWithB = baseScene({ preRequire: { itemsRequired: { any: ['Nanotraje'] } } })
    const sceneWithBoth = baseScene({
      preRequire: { itemsRequired: { any: ['Mochila', 'Nanotraje'] } },
    })

    const scenes = [sceneWithA, sceneWithB, sceneWithBoth]

    const res = scenes.filter((s) =>
      matchesPreRequire(s, { itemsRequired: { any: ['Mochila'] } } as any)
    )
    // should match sceneWithA and sceneWithBoth
    expect(res.map((s) => s.id).sort()).toEqual(
      [sceneWithA.id, sceneWithBoth.id].map((x) => x).sort()
    )
  })

  it('matches itemsRequired.all requires all items (pure match)', () => {
    const sceneAll = baseScene({ preRequire: { itemsRequired: { all: ['Mochila', 'Nanotraje'] } } })
    const sceneOnlyOne = baseScene({ preRequire: { itemsRequired: { all: ['Mochila'] } } })

    const scenes = [sceneAll, sceneOnlyOne]

    const res = scenes.filter((s) =>
      matchesPreRequire(s, { itemsRequired: { all: ['Mochila', 'Nanotraje'] } } as any)
    )
    expect(res.map((s) => s.id)).toEqual([sceneAll.id])
  })

  it('matches hours array requirement (pure match)', () => {
    const s1 = baseScene({ preRequire: { hours: [1, 2, 3] } })
    const s2 = baseScene({ preRequire: { hours: [2] } })

    const scenes = [s1, s2]

    const res = scenes.filter((s) => matchesPreRequire(s, { hours: [2] } as any))
    expect(res.map((s) => s.id).sort()).toEqual([s1.id, s2.id].sort())
  })

  it('rejects when scene misses required skills (pure match)', () => {
    const s1 = baseScene({ preRequire: { skillsRequired: ['SkillA'] } })
    const s2 = baseScene({ preRequire: { skillsRequired: ['SkillB'] } })

    const scenes = [s1, s2]

    const res = scenes.filter((s) => matchesPreRequire(s, { skillsRequired: ['SkillA'] } as any))
    expect(res.map((s) => s.id)).toEqual([s1.id])
  })
})
