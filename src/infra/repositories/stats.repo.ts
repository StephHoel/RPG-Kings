import { db } from '@/infra/dexie/database'
import { Stats } from '@/infra/schemas'

export async function getStatsBySaveId(saveId: string): Promise<Stats | undefined> {
  return db.stats.where({ saveId }).first()
}

export async function createOrUpdateStats(s: Stats): Promise<void> {
  if (s.id !== undefined) {
    await db.stats.put(s)
    return
  }

  await db.stats.add(s)
}

export async function deleteStats(id: number): Promise<void> {
  await db.stats.delete(id)
}
