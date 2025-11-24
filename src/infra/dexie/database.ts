import Dexie, { Table } from 'dexie'
import {
  Animal,
  Discipline,
  Inventory,
  ItemList,
  Log,
  Race,
  Save,
  Scene,
  Sheet,
  Skill,
  Stats,
  StatsBase,
  XPRecord,
} from '@/infra/schemas'
import { registerV1, registerV2, registerV3 } from './versioning'
import { openCatchDB, populateDB, versionChange } from './utils'

export class RPGDatabase extends Dexie {
  animals!: Table<Animal, number>
  disciplines!: Table<Discipline, number>
  inventories!: Table<Inventory, number>
  items!: Table<ItemList, number>
  logs!: Table<Log, number>
  races!: Table<Race, number>
  saves!: Table<Save, string>
  scenes!: Table<Scene, string>
  sheets!: Table<Sheet, number>
  skills!: Table<Skill, number>
  stats!: Table<Stats, number>
  statsBases!: Table<StatsBase, number>
  xpRecord!: Table<XPRecord, number>

  constructor() {
    super('rpg_db')
    this.on('populate', () => populateDB(this))
    this.on('versionchange', () => versionChange(this))
    this.open().catch(async (err) => await openCatchDB(this, err))
  }
}

export const db = new RPGDatabase()
registerV1(db)
registerV2(db)
registerV3(db)
