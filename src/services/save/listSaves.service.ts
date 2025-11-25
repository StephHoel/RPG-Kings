import { getAllSaves } from '@/infra/repositories'
import { Save } from '@/infra/schemas'
import { log } from '@/services/lib'

export async function listSavesService(): Promise<Save[]> {
  const saves = await getAllSaves()

  await log.info(`[${listSavesService.name}] Saves obtidos`, { countSaves: saves.length })

  return saves
}
