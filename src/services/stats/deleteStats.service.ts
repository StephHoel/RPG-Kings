import { LOG_MESSAGES } from '@/domain/constants'
import { deleteStatsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteStatsService(saveId: string): Promise<void> {
  await deleteStatsBySaveId(saveId)

  await log.info(LOG_MESSAGES.stats.deleted({ method: deleteStatsService.name, saveId }))
}
