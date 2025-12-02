import Dexie from 'dexie'
import { db as appDb } from '@/infra/dexie/database'
import { getAllSaves } from '@/infra/repositories'
import { createSaveService } from '@/services'

describe('createSaveService', () => {
  beforeEach(async () => {
    // Use app DB name with timestamp to avoid collisions
    try {
      await appDb.close()
    } catch {}
    try {
      await Dexie.delete(appDb.name)
    } catch {}
    try {
      await appDb.open()
    } catch {}
  })

  afterEach(async () => {
    try {
      await appDb.close()
    } catch {}
  })

  test('creates an active save and deactivates previous saves', async () => {
    // create a previous save
    const existing = { id: 'old', isActive: true, currentWeek: 1, currentDay: 1, currentHour: 8 }
    await appDb.saves.add(existing)
    let newSave: any
    try {
      newSave = await createSaveService()
    } catch (err: any) {
      fail('createSaveService threw: ' + (err && err.stack ? err.stack : String(err)))
      return
    }

    expect(newSave).toBeDefined()
    const all = await getAllSaves()
    if (!newSave) throw new Error('newSave is undefined')
    const dump = { newSave, all }

    // there should be at least one save
    if (all.length < 1) throw new Error('no saves found after creation: ' + JSON.stringify(dump))

    const actives = all.filter((s: any) => s.isActive)
    if (actives.length !== 1)
      throw new Error(
        'expected exactly 1 active save, got ' + actives.length + ' - ' + JSON.stringify(dump)
      )
    if (actives[0].id !== newSave.id)
      throw new Error('active save id mismatch: ' + JSON.stringify(dump))
  })
})
