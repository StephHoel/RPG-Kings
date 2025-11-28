import { StatsModel } from '@/domain/models'
import { CreateStats } from '@/domain/types'
import { createOrUpdateStats, getStatsBaseByTarget, getStatsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

function defaultResource(max = 100, current = max) {
  return { current, max }
}

export async function createStatsService({
  target,
  saveId,
}: CreateStats): Promise<StatsModel | undefined> {
  const baseStats = await getStatsBaseByTarget(target)

  if (!baseStats) {
    await log.warn(`[${createStatsService.name}] Nenhum status base disponível para ${target}`)

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
    health: defaultResource(100, 100),
    hungry: defaultResource(100, 0),
    magic: defaultResource(100, 0),
    mana: defaultResource(100, 0),
    mood: defaultResource(100, 50),
  })

  const statsCreated = await getStatsBySaveId(saveId)

  await log.info(`[${createStatsService.name}] Stats criado com sucesso`, { stats: statsCreated })

  return statsCreated
}
