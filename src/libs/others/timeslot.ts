import { db } from '@/data'
import { Save, TimeslotRule, Scene } from '@/interfaces'

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

  const pool = candidates[0].scenes

  if (!Array.isArray(pool) || pool.length === 0) return null

  const chosenId = pool[Math.floor(Math.random() * pool.length)]

  return await db.scenes.get(chosenId) ?? null
}
