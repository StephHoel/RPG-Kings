import { db } from '@/infra/dexie/database'
import { Log } from '@/infra/schemas'

export async function getAllLogs(): Promise<Log[]> {
  return db.logs.orderBy('createdAt').toArray()
}

export async function createLog(log: Log): Promise<void> {
  if (log.id !== undefined) {
    await db.logs.put(log)
  }

  await db.logs.add(log)
}

export async function deleteLog(id: number): Promise<void> {
  await db.logs.delete(id)
}
