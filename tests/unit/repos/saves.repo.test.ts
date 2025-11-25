import {
  createOrUpdateSave,
  deleteSave,
  desactiveAll,
  getAllSaves,
  getSaveById,
} from '@/infra/repositories'
import { Save } from '@/infra/schemas'

describe('saves.repo', () => {
  const save: Save = {
    id: 'save_test_1',
    isActive: true,
    currentWeek: 0,
    currentDay: 0,
    currentHour: 0,
    updatedAt: new Date(),
    createdAt: new Date(),
  }

  const saves = [save]

  test('create and read all', async () => {
    await createOrUpdateSave(save)

    const all = await getAllSaves()
    expect(all.length).toBe(saves.length)
  })

  test('read one', async () => {
    const fetched = await getSaveById(save.id)

    expect(fetched?.id).toBe(save.id)
  })

  test('update', async () => {
    await createOrUpdateSave({ ...save, currentDay: save.currentDay++ })

    const updated = await getSaveById(save.id)

    expect(updated?.currentDay).not.toBe(save.currentDay)
    expect(updated?.updatedAt).not.toBe(save.createdAt)
  })

  test('desactive all', async () => {
    await desactiveAll()

    const updated = await getSaveById(save.id)

    expect(updated?.isActive).not.toBe(save.isActive)
  })

  test('delete', async () => {
    await deleteSave(save.id)

    const after = await getAllSaves()

    expect(after.length).toBe(0)
  })
})
