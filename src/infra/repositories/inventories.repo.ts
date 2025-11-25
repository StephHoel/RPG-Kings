import { db } from '@/infra/dexie/database'
import { Inventory } from '@/infra/schemas'

export async function getInventoriesBySaveId(saveId: string): Promise<Inventory[]> {
  return db.inventories.where({ saveId }).toArray() // TODO ordenar por acquiredWeek desc, expiresAtWeek e usedAtWeek undefined primeiro
}

export async function createOrUpdateInventory(item: Inventory): Promise<void> {
  if (item.id !== undefined) {
    await db.inventories.put({ ...item, updatedAt: undefined })
    return
  }

  await db.inventories.add(item)
}

export async function deleteInventory(id: number): Promise<void> {
  await db.inventories.delete(id)
}
