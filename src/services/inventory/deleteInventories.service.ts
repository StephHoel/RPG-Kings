import { LOG_MESSAGES } from '@/domain/constants'
import { deleteInventoriesBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteInventoriesService(saveId: string): Promise<void> {
  await deleteInventoriesBySaveId(saveId)

  await log.info(LOG_MESSAGES.inventory.deleted({ method: deleteInventoriesService.name, saveId }))
}
