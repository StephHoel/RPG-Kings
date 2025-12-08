import { PreRequireSceneModel, SceneModel } from '@/domain/models'

export function includesAll<T>(source: T[] | undefined, target: T[] | undefined): boolean {
  if (!target) return true

  if (!source) return false

  return target.every((t) => source.includes(t))
}

export function includesAny<T>(source: T[] | undefined, target: T[] | undefined): boolean {
  if (!target) return true

  if (!source) return false

  return target.find((t) => source.includes(t)) ? true : false
}

export function matchXpRequired(sceneXp: any[] | undefined, queryXp: any[] | undefined) {
  if (!queryXp) return true

  if (!sceneXp) return false

  return queryXp.every((q) => sceneXp.some((s) => s.target === q.target && s.min === q.min))
}

export function matchStatsRequired(sceneStats: any[] | undefined, queryStats: any[] | undefined) {
  if (!queryStats) return true

  if (!sceneStats) return false

  return queryStats.every((q) =>
    sceneStats.some((s) => {
      if (s.stat !== q.stat) return false

      if (q.min !== undefined && s.min !== q.min) return false

      if (q.max !== undefined && s.max !== q.max) return false

      return true
    })
  )
}

export function matchesPreRequire(scene: SceneModel, preRequire: PreRequireSceneModel) {
  if (!preRequire) return true

  const sceneReq = scene.preRequire || {}

  if (preRequire.hours !== undefined) {
    if (!includesAll(sceneReq.hours, preRequire.hours)) return false
  }

  if (preRequire.itemsRequired !== undefined) {
    const qItems = preRequire.itemsRequired
    const sItems = sceneReq.itemsRequired || {}

    if (qItems.all !== undefined) {
      if (!includesAll(sItems.all, qItems.all)) return false
    }

    if (qItems.any !== undefined) {
      if (!includesAny(sItems.any, qItems.any)) return false
    }
  }

  if (preRequire.xpRequired !== undefined) {
    if (!matchXpRequired(sceneReq.xpRequired, preRequire.xpRequired)) return false
  }

  if (preRequire.skillsRequired !== undefined) {
    if (!includesAll(sceneReq.skillsRequired, preRequire.skillsRequired)) return false
  }

  if (preRequire.statsRequired !== undefined) {
    if (!matchStatsRequired(sceneReq.statsRequired, preRequire.statsRequired)) return false
  }

  return true
}
