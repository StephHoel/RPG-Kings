import Dexie from 'dexie'
import { migrateV2toV3 } from '../migrations/v2-to-v3.migration'
import {
  animalsSeed,
  disciplinesSeed,
  itemsSeed,
  racesSeed,
  scenesSeed,
  skillsSeed,
  statsBaseSeed,
} from '../seed'

const TABLES_VERSION_3 = {
  animals_list: '++id, name, race',
  disciplines_list: '++id, name, type, stats',
  inventories: '++id, saveId, type, expiresAtWeek, usedAtWeek',
  items_list: '++id, name, type',
  logs: '++id, type, createdAt',
  races_list: '++id, name',
  saves: 'id, isActive',
  scenes_list: 'id, title',
  sheets: '++id, &saveId, name, race',
  skills_list: '++id, name, type, races',
  stats_base_list: '++id, type, target',
  stats: '++id, &saveId',
  xp_records: '++id, saveId, type, target',
}

export const SEED_MAP_V3 = {
  animals_list: animalsSeed,
  disciplines_list: disciplinesSeed,
  items_list: itemsSeed,
  races_list: racesSeed,
  scenes_list: scenesSeed,
  skills_list: skillsSeed,
  stats_base_list: statsBaseSeed,
} as const

export function registerV3(db: Dexie) {
  db.version(3).stores(TABLES_VERSION_3).upgrade(migrateV2toV3)
}
