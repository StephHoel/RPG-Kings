import { getSaveById } from '@/infra/repositories'
import { Save } from '@/infra/schemas'
import { log } from '@/services/lib'

export async function getSaveService(saveId: string): Promise<Save | undefined> {
  if (!saveId) {
    await log.info(`[${getSaveService.name}] SaveId nulo`)
    return undefined
  }

  const save = await getSaveById(saveId)
  await log.info(`[${getSaveService.name}] Jogo obtido`, { save })

  return save
}
