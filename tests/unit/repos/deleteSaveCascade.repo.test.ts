import { createOrUpdateSave, deleteSaveCascade, getAllSaves } from '@/infra/repositories'
import { createOrUpdateSheet } from '@/infra/repositories/sheets.repo'
import { createOrUpdateStats } from '@/infra/repositories/stats.repo'
import { createOrUpdateInventory } from '@/infra/repositories/inventories.repo'
import { createOrUpdateXP } from '@/infra/repositories/xpRecords.repo'
import { Sheet } from '@/infra/schemas'
import { Stats } from '@/infra/schemas'
import { Inventory } from '@/infra/schemas'
import { XPRecord } from '@/infra/schemas'
import { SaveModel } from '@/domain/models'
import { ITEM_ENUM, ITEM_TYPE, RACE_ENUM } from '@/domain/constants'

describe('deleteSaveCascade', () => {
  const save: SaveModel = {
    id: 'cascade_test_save',
    isActive: false,
    currentWeek: 1,
    currentDay: 1,
    currentHour: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
  }

  const sheet: Sheet = {
    saveId: save.id,
    name: 'Sheet Test',
    race: RACE_ENUM.arcane,
    coins: 0,
    createdAt: new Date(),
  }

  const stats: Stats = {
    saveId: save.id,
    strength: 1,
    agility: 1,
    intelligence: 1,
    charisma: 1,
    stamina: 1,
    hungry: { current: 0, max: 0 },
    mood: { current: 0, max: 0 },
    health: { current: 0, max: 0 },
    magic: { current: 0, max: 0 },
    mana: { current: 0, max: 0 },
    createdAt: new Date(),
  }

  const inventory: Inventory = {
    saveId: save.id,
    item: ITEM_ENUM.laptop,
    type: ITEM_TYPE.eletronic,
    acquiredWeek: 1,
    createdAt: new Date(),
  }

  const xp: XPRecord = {
    saveId: save.id,
    target: 'some_discipline',
    type: 'class',
    xp: 10,
    createdAt: new Date(),
  }

  test('removes related records when deleting save', async () => {
    // create save and related records
    await createOrUpdateSave(save)

    await createOrUpdateSheet(sheet)
    await createOrUpdateStats(stats)
    await createOrUpdateInventory(inventory)
    await createOrUpdateXP(xp)

    // Sanity checks - ensure they exist
    const allBefore = await getAllSaves()
    expect(allBefore.find((s) => s.id === save.id)).toBeDefined()

    // perform cascade delete
    await deleteSaveCascade(save.id)

    // verify save gone
    const allAfter = await getAllSaves()
    expect(allAfter.find((s) => s.id === save.id)).toBeUndefined()

    // verify dependent stores are empty for this saveId
    // use repo-specific getters to assert emptiness
    const sheets = await (await import('@/infra/repositories')).getSheetBySaveId?.(save.id)
    const statsFetched = await (await import('@/infra/repositories')).getStatsBySaveId?.(save.id)
    const inv = await (await import('@/infra/repositories')).getInventoriesBySaveId?.(save.id)
    const xprecs = await (await import('@/infra/repositories')).getXPsBySaveId?.(save.id)

    expect(sheets).toBeUndefined()
    expect(statsFetched).toBeUndefined()
    expect(inv && inv.length).toBe(0)
    expect(xprecs && xprecs.length).toBe(0)
  })
})
