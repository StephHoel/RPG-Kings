import Dexie from 'dexie'
import { migrateV1toV2 } from '../migrations/v1-to-v2.migration'

const TABLES_VERSION_2 = {
  saves: 'id, isActive, currentWeek, currentDay, currentHour',
  sheets: 'saveId',
  scenes: 'id, title',
  milestones: '++id, saveId, type, key',
  inventory: '++id, saveId, expiresAtWeek',
  items: 'id',
  settings: 'id',
  logs: '++id, createdAt, type',
  disciplines: '++id, saveId',
}

export function registerV2(db: Dexie) {
  db.version(2).stores(TABLES_VERSION_2).upgrade(migrateV1toV2)
}
