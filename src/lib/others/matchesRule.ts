import { Save, TimeslotRule } from '@/interfaces'

export function matchesRule(save: Save, rule: TimeslotRule) {
  const dayOk = !rule.weekdays || rule.weekdays.includes(save.currentDay)

  const hourOk = !rule.hours || rule.hours.includes(save.currentHour)

  const weekOk = !rule.weeks || rule.weeks.includes(save.currentWeek)

  return dayOk && hourOk && weekOk
}
