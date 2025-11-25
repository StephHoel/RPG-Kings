import { db } from '@/infra/dexie/database'
import { XPRecord } from '@/infra/schemas'

export async function getXPBySaveId(saveId: string): Promise<XPRecord[]> {
  return db.xp_records.where({ saveId }).toArray()
}

export async function createOrUpdateXP(record: XPRecord): Promise<void> {
  if (record.id !== undefined) {
    await db.xp_records.put({ ...record, updatedAt: new Date() })
    return
  }

  await db.xp_records.add(record)
}

export async function deleteXP(id: number): Promise<void> {
  await db.xp_records.delete(id)
}
