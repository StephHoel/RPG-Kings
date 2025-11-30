import { getSaveById } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'

export async function getSaveService(saveId: string): Promise<SaveModel | undefined> {
  if (!saveId) {
    await log.info(`[${getSaveService.name}] SaveId nulo`)
    return undefined
  }

  const save = await getSaveById(saveId)
  await log.info(`[${getSaveService.name}] Jogo obtido`, undefined, { save })

  return save
}
