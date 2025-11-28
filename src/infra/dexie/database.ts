import Dexie, { Table } from 'dexie'
import {
  Animal,
  Discipline,
  Inventory,
  Item,
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
import { registerV1, registerV2, registerV3, registerV4 } from './versioning'
import { openCatchDB, populateDB, versionChange } from './utils'

export class RPGDatabase extends Dexie {
  animals_list!: Table<Animal, number>
  disciplines_list!: Table<Discipline, number>
  inventories!: Table<Inventory, number>
  items_list!: Table<Item, number>
  logs!: Table<Log, number>
  races_list!: Table<Race, number>
  saves!: Table<Save, string>
  scenes_list!: Table<Scene, string>
  sheets!: Table<Sheet, number>
  skills_list!: Table<Skill, number>
  stats!: Table<Stats, number>
  stats_base_list!: Table<StatsBase, number>
  xp_records!: Table<XPRecord, number>

  constructor() {
    super('rpg_db')
    registerV1(this)
    registerV2(this)
    registerV3(this)
    registerV4(this)

    // if (process.env.NODE_ENV !== 'test')
    this.on('populate', () => populateDB(this))

    this.on('versionchange', () => versionChange(this))

    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test')
      this.open().catch(async (err) => await openCatchDB(this, err))
  }
}

export const db = new RPGDatabase()
