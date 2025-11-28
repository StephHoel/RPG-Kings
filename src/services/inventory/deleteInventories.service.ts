import { deleteInventoriesBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteInventoriesService(saveId: string): Promise<void> {
  await deleteInventoriesBySaveId(saveId)

  await log.info(`[${deleteInventoriesService.name}] Inventário deletado para ${saveId}`)
}
