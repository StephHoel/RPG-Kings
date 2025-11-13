import Dexie, { Table } from 'dexie'
import { Save, Sheet, Scene, Milestone, InventoryItem, Settings, LogRow } from '@/interfaces'
import { inventorySeed } from '@/constants'
import { safeBulkAdd } from '@/lib'

class RPGDatabase extends Dexie {
  saves!: Table<Save, string>
  sheets!: Table<Sheet, string>
  scenes!: Table<Scene, string>
  milestones!: Table<Milestone, string>
  inventory!: Table<InventoryItem, string>
  settings!: Table<Settings, string>
  logs!: Table<LogRow, number>

  constructor() {
    super('rpg_db')
    this.version(1).stores({
      saves: 'id, isActive, currentWeek, currentDay, currentHour',
      sheets: 'id, saveId',
      scenes: 'id',
      milestones: '++id, saveId, type, key',
      inventory: '++id, saveId, expiresAtWeek',
      settings: 'id',
      logs: '++id, createdAt, type',
    })

    this.on('populate', async () => {
      await safeBulkAdd(db.inventory, inventorySeed)
    })
  }
}

export const db = new RPGDatabase()
