import Dexie from 'dexie'
import { migrateV2toV3 } from '../migrations/v2-to-v3.migration'

const TABLES_VERSION_3 = {
  saves: 'id, isActive',
  sheets: '++id, &saveId, name, race',
  stats: '++id, &saveId',
  xp_records: '++id, saveId, type, target',
  inventories: '++id, saveId, type, expiresAtWeek, usedAtWeek',
  logs: '++id, type, createdAt',
  scenes_list: 'id, title',
  items_list: '++id, name, type',
  stats_base_list: '++id, type, target',
  races_list: '++id, name',
  animals_list: '++id, name, race',
  skills_list: '++id, name, type, races',
  disciplines_list: '++id, name, type, skills, stats',
}

export function registerV3(db: Dexie) {
  db.version(3).stores(TABLES_VERSION_3).upgrade(migrateV2toV3)
}
