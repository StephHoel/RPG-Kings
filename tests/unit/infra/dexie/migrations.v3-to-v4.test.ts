import Dexie from 'dexie'
import { migrateV3toV4 } from '@/infra/dexie/migrations/v3-to-v4.migration'

describe('migrateV3toV4', () => {
  let db: Dexie

  beforeEach(async () => {
    db = new Dexie('test_mig_v3_v4_' + Date.now())
    db.version(3).stores({ stats: '++id, &saveId' })
    await db.open()
  })

  afterEach(async () => {
    try {
      db.close()
    } catch {
      // ignore
    }
    await Dexie.delete(db.name)
  })

  test('converts numeric stat fields to objects and persists them', async () => {
    const stats = db.table('stats')

    await stats.add({ saveId: 1, health: 80, hungry: 10, magic: 5, mana: 0, mood: 60 })
    await stats.add({ saveId: 2, health: { current: 50, max: 100 }, hungry: 20, mood: 40 })

    const tx = {
      table: (name: string) => (db as any).table(name),
      db,
    }

    await migrateV3toV4(tx as any)

    const all = await db.table('stats').toArray()

    expect(all.length).toBe(2)

    for (const rec of all) {
      expect(rec.health).toBeDefined()
      expect(typeof rec.health).toBe('object')
      expect(rec.health).toHaveProperty('current')
      expect(rec.health).toHaveProperty('max')

      expect(rec.hungry).toBeDefined()
      expect(typeof rec.hungry).toBe('object')

      expect(rec.mood).toBeDefined()
      expect(typeof rec.mood).toBe('object')
    }
  })
})
