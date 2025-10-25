import { db } from '@/data/db'
import { Save, Scene, TimeslotRule } from '@/data/types'

function matchesRule(save: Save, rule: TimeslotRule) {
  const dayOk = !rule.weekdays || rule.weekdays.includes(save.currentDay)
  const hourOk = !rule.hours || rule.hours.includes(save.currentHour)
  const weekOk = !rule.weeks || rule.weeks.includes(save.currentWeek)
  return dayOk && hourOk && weekOk
}

export async function resolveSceneForNow(save: Save): Promise<Scene | null> {
  const rules = await db.timeslots.toArray()
  const candidates = rules.filter(r => matchesRule(save, r))
  if (candidates.length === 0) return null
  const pool = candidates[0].scenePool
  const total = pool.reduce((acc, s) => acc + (s.weight ?? 1), 0)
  let rnd = Math.random() * total
  const chosen = pool.find(s => (rnd -= (s.weight ?? 1)) < 0) ?? pool[0]
  const scene = await db.scenes.get(chosen.sceneId)
  return scene ?? null
}
