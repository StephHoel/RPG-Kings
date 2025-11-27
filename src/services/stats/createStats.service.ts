import { StatsModel } from '@/domain/models'
import { CreateStats } from '@/domain/types'
import { createOrUpdateStats, getStatsBaseByTarget, getStatsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function createStatsService({
  raceOrAnimal,
  saveId,
}: CreateStats): Promise<StatsModel | undefined> {
  const baseStats = await getStatsBaseByTarget(raceOrAnimal)

  if (!baseStats) {
    await log.warn(
      `[${createStatsService.name}] Nenhum status base disponível para ${raceOrAnimal}`
    )

    return
  }

  // TODO ajustar esses valores
  // TODO definir o range: 0-10 ou 0-100 ou...?
  const stats = {
    saveId: saveId,
    agility: baseStats.agility,
    charisma: baseStats.charisma,
    intelligence: baseStats.intelligence,
    stamina: baseStats.stamina,
    strength: baseStats.strength,
    health: 0, // escolher um valor e um range
    hungry: 0, // escolher um valor e um range
    magic: 0, // escolher um valor e um range
    mana: 0, // escolher um valor e um range
    mood: 0, // escolher um valor e um range
  } as StatsModel

  await createOrUpdateStats(stats)

  const statsCreated = await getStatsBySaveId(saveId)

  await log.info(`[${createStatsService.name}] Stats criado com sucesso`, { stats: statsCreated })

  return statsCreated
}
