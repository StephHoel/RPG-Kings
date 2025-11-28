import { getStatsBySaveId } from '@/infra/repositories'
import { StatsModel } from '@/domain/models'
import { log } from '@/services'

export async function getStatsService(saveId: string): Promise<StatsModel | undefined> {
  const stats = await getStatsBySaveId(saveId)

  await log.info(`[${getStatsService.name}] Stats obtido para ${saveId}`)

  return stats
}
