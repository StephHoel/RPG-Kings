import { db } from '@/infra/dexie/database'
import { XPRecord } from '@/infra/schemas'

export async function getXPsBySaveId(saveId: string): Promise<XPRecord[]> {
  return db.xp_records.where({ saveId }).toArray()
}

export async function getXPBySaveIdAndDiscipline(
  saveId: string,
  discipline: string
): Promise<XPRecord | undefined> {
  return db.xp_records.where({ saveId, target: discipline }).first()
}

export async function createOrUpdateXP(record: XPRecord): Promise<void> {
  if (record.id !== undefined) {
    await db.xp_records.put({ ...record, updatedAt: undefined })
    return
  }

  await db.xp_records.add(record)
}

export async function deleteXPBySaveId(saveId: XPRecord['saveId']): Promise<void> {
  const xp = await db.xp_records.where({ saveId }).toArray()

  const idsToDelete = xp.map((s) => s.id).filter((s) => s !== undefined)

  await db.xp_records.bulkDelete(idsToDelete)
}
