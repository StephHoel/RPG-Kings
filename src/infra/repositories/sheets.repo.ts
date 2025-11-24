import { db } from '@/infra/dexie/database'
import { Sheet } from '@/infra/schemas'

export async function getSheetBySaveId(saveId: string): Promise<Sheet | undefined> {
  return db.sheets.where({ saveId }).first()
}

export async function createOrUpdateSheet(sheet: Sheet): Promise<void> {
  if (sheet.id !== undefined) {
    await db.sheets.put(sheet)
  }

  await db.sheets.add(sheet)
}

export async function deleteSheet(id: number): Promise<void> {
  await db.sheets.delete(id)
}
