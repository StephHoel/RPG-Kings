import { db } from '@/infra/dexie/database'
import { Log } from '@/infra/schemas'

export async function getAllLogs(): Promise<Log[]> {
  return db.logs.orderBy('createdAt').toArray()
}

export async function createLog(log: Log): Promise<void> {
  await db.logs.add(log)
}

export async function deleteLog(id: number): Promise<void> {
  await db.logs.delete(id)
}

export async function clearLogs(): Promise<void> {
  await db.logs.clear()
}
