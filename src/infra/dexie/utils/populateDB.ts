import { safeBulkAdd } from '@/services/lib'
import { RPGDatabase } from '../database'
import {
  animalsSeed,
  disciplinesSeed,
  itemsSeed,
  racesSeed,
  scenesSeed,
  skillsSeed,
  statsBaseSeed,
} from '../seed'

const seedMap = {
  animals: animalsSeed,
  disciplines: disciplinesSeed,
  items: itemsSeed,
  races: racesSeed,
  scenes: scenesSeed,
  skills: skillsSeed,
  statsBases: statsBaseSeed,
  // inventories: inventoriesSeed,
  // logs: logsSeed,
  // saves: savesSeed,
  // sheets: sheetsSeed,
  // stats: statsSeed,
  // xpRecord: xpRecordsSeed,
} as const

// Popula seed ao criar pela primeira vez
export async function populateDB(db: RPGDatabase) {
  for (const key of Object.keys(seedMap) as (keyof typeof seedMap)[]) {
    await safeBulkAdd(db[key] as any, seedMap[key] as any)
  }
}
