import Dexie from 'dexie'
import { migrateV3toV4 } from '@/infra/dexie/migrations/v3-to-v4.migration'

describe('migrateV3toV4 - disciplines sanitization', () => {
  let db: Dexie

  beforeEach(async () => {
    db = new Dexie('test_mig_disciplines_' + Date.now())
    db.version(3).stores({
      disciplines_list: '++id, name, type, skills, stats',
      stats: '++id, &saveId',
    })
    await db.open()
  })

  afterEach(async () => {
    try {
      db.close()
    } catch {}
    await Dexie.delete(db.name)
  })

  test('removes skills and disciplines from disciplines_list records', async () => {
    // diagnostics disabled; use global test setup
    const table = db.table('disciplines_list')

    // add a record with skills and disciplines
    await (table as any).add({
      id: 1,
      name: 'Test',
      type: 'optional',
      skills: ['x'],
      disciplines: ['y'],
      stats: ['intelligence'],
    })
    await (table as any).add({
      id: 2,
      name: 'Test2',
      type: 'optional',
      skills: [],
      disciplines: [],
      stats: ['stamina'],
    })

    // verify records exist before migration
    const before = await db.table('disciplines_list').toArray()
    console.log('records before migration:', before)

    // run migration within a transaction that includes all tables used by the migration
    // so operations on `stats` and other tables are allowed
    const tableNames = db.tables.map((t) => (t as any).name)
    await db.transaction('rw', tableNames, async (tx) => {
      await migrateV3toV4(tx as any)
    })

    const all = await db.table('disciplines_list').toArray()
    console.log('records after migration:', all)
    console.log('records after migration:', all)
    expect(all.length).toBe(2)

    try {
      for (const rec of all) {
        expect(rec).not.toHaveProperty('skills')
        expect(rec).not.toHaveProperty('disciplines')
        expect(rec).toHaveProperty('stats')
      }
    } catch (err) {
      console.error('Assertion failed. Records:', all)
      throw err
    }
  })
})
