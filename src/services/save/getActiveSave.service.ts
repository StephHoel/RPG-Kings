import { getActiveSave } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function getActiveSaveService(): Promise<SaveModel | undefined> {
  const activeSave = await getActiveSave()

  await log.info(LOG_MESSAGES.save.obtained({ method: getActiveSaveService.name }), { activeSave })

  return activeSave
}
