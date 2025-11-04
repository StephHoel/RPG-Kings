import { db } from '@/data/db'
import { nanoid } from 'nanoid'

export async function deleteSave(saveId: string) {
  await db.saves.delete(saveId)
}