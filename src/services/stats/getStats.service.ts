import { getStatsBySaveId } from '@/infra/repositories'
import { StatsModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function getStatsService(saveId: string): Promise<StatsModel | undefined> {
  const stats = await getStatsBySaveId(saveId)

  await log.info(LOG_MESSAGES.stats.obtained({ method: getStatsService.name, saveId }))

  return stats
}
