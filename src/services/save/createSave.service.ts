import { nanoid } from 'nanoid'
import { Save } from '@/infra/schemas'
import { log } from '@/services/lib'
import { desactiveAll, createOrUpdateSave } from '@/infra/repositories'

export async function createSaveService(): Promise<string> {
  await desactiveAll()
  await log.info(`[${createSaveService.name}] Jogos anteriores inativados`)

  const saveId = nanoid(10)

  const save: Save = {
    id: saveId,
    isActive: true,
    currentWeek: 1,
    currentDay: 1,
    currentHour: 8,
  }

  await createOrUpdateSave(save)

  await log.info(`[${createSaveService.name}] Save criado`, save)

  return saveId
}
