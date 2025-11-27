import { db } from '@/infra/dexie/database'
import { Stats } from '@/infra/schemas'

export async function getStatsBySaveId(saveId: string): Promise<Stats | undefined> {
  return db.stats.where({ saveId }).first()
}

export async function createOrUpdateStats(s: Stats): Promise<void> {
  if (s.id !== undefined) {
    await db.stats.put({ ...s, updatedAt: undefined })
    return
  }

  await db.stats.add(s)
}

export async function deleteStatsBySaveId(saveId: Stats['saveId']): Promise<void> {
  const stats = await db.stats.where({ saveId }).toArray()

  const idsToDelete = stats.map((s) => s.id).filter((s) => s !== undefined)

  await db.stats.bulkDelete(idsToDelete)
}
