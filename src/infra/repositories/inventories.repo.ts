import { db } from '@/infra/dexie/database'
import { Inventory } from '@/infra/schemas'

export async function getInventoriesBySaveId(saveId: Inventory['saveId']): Promise<Inventory[]> {
  return await db.inventories.where({ saveId }).toArray()
}

export async function createOrUpdateInventory(item: Inventory): Promise<void> {
  if (item.id !== undefined) {
    await db.inventories.put({ ...item, updatedAt: undefined })
    return
  }

  await db.inventories.add(item)
}

export async function deleteInventoriesBySaveId(saveId: Inventory['saveId']): Promise<void> {
  const inventories = await db.inventories.where({ saveId }).toArray()

  const idsToDelete = inventories.map((s) => s.id).filter((s) => s !== undefined)

  await db.inventories.bulkDelete(idsToDelete)
}
