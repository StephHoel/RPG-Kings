import { getActiveSave } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'

export async function getActiveSaveService(): Promise<SaveModel | undefined> {
  const activeSave = await getActiveSave()

  await log.info(`[${getActiveSaveService.name}] Save obtido com sucesso`, undefined, { activeSave })

  return activeSave
}
