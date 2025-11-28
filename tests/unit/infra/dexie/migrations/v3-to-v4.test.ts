import Dexie from 'dexie'
import { migrateV3toV4 } from '@/infra/dexie/migrations/v3-to-v4.migration'

describe('migrateV3toV4', () => {
  let db: any

  beforeEach(async () => {
    db = new Dexie('testdb_migrate_v3_to_v4_' + Date.now())
    db.version(3).stores({ stats: '++id, &saveId' })
    await db.open()
  })

  afterEach(async () => {
    try {
      await db.close()
      await Dexie.delete(db.name)
    } catch (e) {
      // ignore
    }
  })

  it('converts numeric resource fields into {current,max} objects', async () => {
    const stats = db.table('stats')
    await stats.add({
      saveId: 's1',
      strength: 5,
      agility: 4,
      intelligence: 3,
      charisma: 2,
      stamina: 1,
      hungry: 50,
      mood: 40,
      health: 100,
      magic: 10,
      mana: 10,
    })

    await db.transaction('rw', stats, async (tx: any) => {
      await migrateV3toV4(tx)
    })

    const all = await stats.toArray()
    expect(all.length).toBe(1)
    const rec = all[0]
    expect(typeof rec.health).toBe('object')
    expect(rec.health).toHaveProperty('current')
    expect(rec.health).toHaveProperty('max')
    expect(rec.hungry.current).toBe(50)
    expect(rec.hungry.max).toBe(100)
  })
})
