import Dexie, { Table } from 'dexie'
import { Save, Sheet, Scene, TimeslotRule, Milestone, InventoryItem, Settings } from './types'

class RPGDatabase extends Dexie {
  saves!: Table<Save, string>
  sheets!: Table<Sheet, string>
  scenes!: Table<Scene, string>
  timeslots!: Table<TimeslotRule, string>
  milestones!: Table<Milestone, string>
  inventory!: Table<InventoryItem, string>
  settings!: Table<Settings, string>

  constructor() {
    super('rpg_db')
    this.version(1).stores({
      saves: 'id, isActive, currentWeek, currentDay, currentHour',
      sheets: 'id, saveId',
      scenes: 'id',
      timeslots: 'id',
      milestones: 'id, saveId, type, key',
      inventory: 'id, saveId, expiresAtWeek',
      settings: 'id',
    })
  }
}

export const db = new RPGDatabase()
