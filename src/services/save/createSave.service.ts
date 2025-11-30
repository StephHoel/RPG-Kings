import { nanoid } from 'nanoid'
import { SaveModel } from '@/domain/models'
import { log } from '@/services'
import { desactiveAll, createOrUpdateSave, getSaveById } from '@/infra/repositories'

export async function createSaveService(): Promise<SaveModel | undefined> {
  await desactiveAll()
  await log.info(`[${createSaveService.name}] Jogos anteriores inativados`)

  const saveId = nanoid(10)

  await createOrUpdateSave({
    id: saveId,
    isActive: true,
    currentWeek: 1,
    currentDay: 1,
    currentHour: 8,
  } as SaveModel)

  const save = await getSaveById(saveId)
  await log.info(`[${createSaveService.name}] Save criado`, undefined, save)

  return save
}
