import { db } from '@/infra/dexie/database'
import { Save } from '@/infra/schemas'

export async function getSaveById(id: string): Promise<Save | undefined> {
  return db.saves.get(id)
}

export async function getActiveSave(): Promise<Save | undefined> {
  return db.saves.filter((save) => save.isActive === true).first()
}

export async function getAllSaves(): Promise<Save[]> {
  return db.saves.toArray()
}

export async function createOrUpdateSave(save: Save): Promise<void> {
  const saveFound = await getSaveById(save.id)

  if (saveFound) {
    await db.saves.put({ ...save, updatedAt: undefined })
    return
  }

  await db.saves.add(save)
}

export async function desactiveAll(): Promise<void> {
  await db.saves.toCollection().modify({ isActive: false, updatedAt: undefined })
}

export async function deleteSave(id: string): Promise<void> {
  await db.saves.delete(id)
}
