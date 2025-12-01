import { getAllSaves } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function getAllSavesService(): Promise<SaveModel[]> {
  const saves = await getAllSaves()

  await log.info(LOG_MESSAGES.saves.obtained({ method: getAllSavesService.name }), {
    countSaves: saves.length,
  })

  return saves
}
