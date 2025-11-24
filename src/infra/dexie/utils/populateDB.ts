import { safeBulkAdd } from '@/services/lib'
import { itemSeed } from '../seed/item'
import { RPGDatabase } from '../database'

const seedMap = {
  items: itemSeed,
} as const

// Popula seed ao criar pela primeira vez
export async function populateDB(db: RPGDatabase) {
  for (const key of Object.keys(seedMap) as (keyof typeof seedMap)[]) {
    await safeBulkAdd(db[key], seedMap[key])
  }
}
