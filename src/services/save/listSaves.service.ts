import { getAllSaves } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'

export async function listSavesService(): Promise<SaveModel[]> {
  const saves = await getAllSaves()

  await log.info(`[${listSavesService.name}] Saves obtidos`, { countSaves: saves.length })

  return saves
}
