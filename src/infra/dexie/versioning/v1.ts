import Dexie from 'dexie'

const TABLES_VERSION_1 = {
  saves: 'id, isActive, currentWeek, currentDay, currentHour',
  sheets: 'id, saveId',
  scenes: 'id',
  milestones: '++id, saveId, type, key',
  inventory: '++id, saveId, expiresAtWeek',
  items: 'id',
  settings: 'id',
  logs: '++id, createdAt, type',
  disciplines: '++id, saveId',
}

export function registerV1(db: Dexie) {
  db.version(1).stores(TABLES_VERSION_1)
}
