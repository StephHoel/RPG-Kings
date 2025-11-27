import { deleteStatsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteStatsService(saveId: string): Promise<void> {
  await deleteStatsBySaveId(saveId)

  await log.info(`[${deleteStatsService.name}] Stats deletado para ${saveId}`)
}
