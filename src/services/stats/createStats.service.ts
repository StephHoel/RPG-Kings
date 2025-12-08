import { LOG_MESSAGES } from '@/domain/constants'
import { StatsModel } from '@/domain/models'
import { CreateStats } from '@/domain/types'
import { defaultResourceNormalized } from '@/domain/utils'
import { createOrUpdateStats, getStatsBaseByTarget, getStatsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function createStatsService({
  target,
  saveId,
}: CreateStats): Promise<StatsModel | undefined> {
  const baseStats = await getStatsBaseByTarget(target)

  if (!baseStats) {
    await log.warn(LOG_MESSAGES.stats.error.unavaiable({ method: createStatsService.name, target }))

    return
  }

  // Base stats (levels) remain as numbers (ex.: 1-10)
  // Dynamic resources stored as objects { current, max }
  await createOrUpdateStats({
    saveId: saveId,
    agility: baseStats.agility,
    charisma: baseStats.charisma,
    intelligence: baseStats.intelligence,
    stamina: baseStats.stamina,
    strength: baseStats.strength,
    health: defaultResourceNormalized(100, 100),
    hungry: defaultResourceNormalized(100, 50),
    magic: defaultResourceNormalized(100, 0),
    mana: defaultResourceNormalized(100, 0),
    mood: defaultResourceNormalized(100, 50),
  })

  const statsCreated = await getStatsBySaveId(saveId)

  await log.info(LOG_MESSAGES.stats.created({ method: createStatsService.name }), {
    stats: statsCreated,
  })

  return statsCreated
}
