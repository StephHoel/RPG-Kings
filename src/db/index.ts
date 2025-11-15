import Dexie, { Table } from 'dexie'
import { Save, Sheet, Scene, Milestone, Inventory, Settings, LogRow, Item } from '@/interfaces'
import { safeBulkAdd } from '@/lib'
import { itemSeed } from '@/constants'

class RPGDatabase extends Dexie {
  saves!: Table<Save, string>
  sheets!: Table<Sheet, string>
  scenes!: Table<Scene, string>
  milestones!: Table<Milestone, string>
  inventory!: Table<Inventory, string>
  items!: Table<Item, string>
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
      items: 'id',
      settings: 'id',
      logs: '++id, createdAt, type',
    })

    this.on('populate', async () => {
      await safeBulkAdd(db.items, itemSeed)
    })
  }
}

export const db = new RPGDatabase()
