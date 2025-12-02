import { LOG_MESSAGES } from '@/domain/constants'
import { deleteXPBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteXPService(saveId: string): Promise<void> {
  await deleteXPBySaveId(saveId)

  await log.info(LOG_MESSAGES.xp.deleted({ method: deleteXPService.name, saveId }))
}
