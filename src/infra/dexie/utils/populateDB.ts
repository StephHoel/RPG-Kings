import { RPGDatabase } from '../database'
import { SEED_MAP_V3 } from '../versioning'
import { safeBulkAdd } from './safeBulkAdd'
import { LOG_MESSAGES } from '@/domain/constants'

// Popula seed ao criar pela primeira vez
export async function populateDB(db: RPGDatabase) {
  for (const key of Object.keys(SEED_MAP_V3) as (keyof typeof SEED_MAP_V3)[]) {
    console.info(
      LOG_MESSAGES.dexie.dexieUtils.populateDB.start({ method: 'populateDB', table: String(key) })
    )

    const table = db[key]
    if (!table) continue

    table.clear()

    // Otherwise, fall back to the non-keySelector path which uses bulkPut
    if (typeof table.bulkPut === 'function') {
      await safeBulkAdd(table as any, SEED_MAP_V3[key] as any)
      continue
    }

    // Last resort: insert items one-by-one using .put
    if (typeof table.put === 'function') {
      for (const e of SEED_MAP_V3[key] as any[]) {
        try {
          await table.put(e)
        } catch (err) {
          // ignore individual insert errors during populate
          console.warn(
            LOG_MESSAGES.dexie.dexieUtils.populateDB.itemInsertFail({ method: 'populateDB' }),
            err
          )
        }
      }
    }
  }
}
