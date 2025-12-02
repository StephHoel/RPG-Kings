import { getSaveById } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function getSaveService(saveId: string): Promise<SaveModel | undefined> {
  if (!saveId) {
    await log.info(LOG_MESSAGES.save.saveIdNull({ method: getSaveService.name }))
    return undefined
  }

  const save = await getSaveById(saveId)

  await log.info(LOG_MESSAGES.game.obtained({ method: getSaveService.name }), { save })

  return save
}
