import { getAllSaves } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'

export async function getAllSavesService(): Promise<SaveModel[]> {
  const saves = await getAllSaves()

  await log.info(`[${getAllSavesService.name}] Saves obtidos`, undefined, { countSaves: saves.length })

  return saves
}
