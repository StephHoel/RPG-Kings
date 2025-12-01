import { deleteSaveCascade } from '@/infra/repositories'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function deleteSaveService(id: string): Promise<void> {
  await deleteSaveCascade(id)

  await log.info(LOG_MESSAGES.save.deleted({ method: deleteSaveService.name, id }))
}
