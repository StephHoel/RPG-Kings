import { db } from '@/infra/dexie/database'
import 'fake-indexeddb/auto'

// Create an isolated DB instance for tests
export async function clearDb() {
  // Clear all tables on shared db
  const tables = Object.keys(db.tables || {})

  for (const t of tables) {
    await db.table(t).clear()
  }
}

export { db }
