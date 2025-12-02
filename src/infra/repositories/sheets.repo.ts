import { db } from '@/infra/dexie/database'
import { Sheet } from '@/infra/schemas'

export async function getSheetBySaveId(saveId: string): Promise<Sheet | undefined> {
  return db.sheets.where({ saveId }).first()
}

export async function createOrUpdateSheet(sheet: Sheet): Promise<void> {
  if (sheet.id) {
    await db.sheets.put({ ...sheet, updatedAt: undefined })
    return
  }

  await db.sheets.add(sheet)
}

export async function deleteSheetsBySaveId(saveId: Sheet['saveId']): Promise<void> {
  const sheets = await db.sheets.where({ saveId }).toArray()

  const idsToDelete = sheets.map((s) => s.id).filter((s) => s !== undefined)

  await db.sheets.bulkDelete(idsToDelete)
}
