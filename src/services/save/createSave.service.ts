import { nanoid } from 'nanoid'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'
import { desactiveAll, createOrUpdateSave, getSaveById } from '@/infra/repositories'
import { LOG_MESSAGES } from '@/domain/constants'

export async function createSaveService(): Promise<SaveModel | undefined> {
  await desactiveAll()
  await log.info(LOG_MESSAGES.saves.desactiveAll({ method: createSaveService.name }))

  const saveId = nanoid(10)

  await createOrUpdateSave({
    id: saveId,
    isActive: true,
    currentWeek: 1,
    currentDay: 1,
    currentHour: 8,
  } as SaveModel)

  const save = await getSaveById(saveId)

  await log.info(LOG_MESSAGES.save.created({ method: createSaveService.name }), save)

  return save
}
