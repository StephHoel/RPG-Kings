import { db } from '@/infra/dexie/database'
import { XPRecord } from '@/infra/schemas'

export async function getXPBySaveId(saveId: string): Promise<XPRecord[]> {
  return db.xpRecord.where({ saveId }).toArray()
}

export async function createOrUpdateXP(record: XPRecord): Promise<void> {
  if (record.id !== undefined) {
    await db.xpRecord.put(record)
  }

  await db.xpRecord.add(record)
}

export async function deleteXP(id: number): Promise<void> {
  await db.xpRecord.delete(id)
}
