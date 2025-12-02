import { Table, Transaction } from 'dexie'
import { LOG_MESSAGES } from '@/domain/constants'

// Migrate stats numeric resources to objects { current, max }
export async function migrateV3toV4(tx: Transaction) {
  console.log(LOG_MESSAGES.dexie.migrate.V3toV4.start({ method: 'Dexie' }))

  try {
    const statsTable = tx.table('stats') as Table<any>
    const all = await statsTable.toArray()
    console.log(
      LOG_MESSAGES.dexie.migrate.V3toV4.statsFound({ method: 'Dexie', count: all.length })
    )

    const migrated = all.map((rec: any) => {
      const convert = (val: any, defaultMax = 100, defaultCurrent?: any) => {
        if (val && typeof val === 'object' && 'current' in val && 'max' in val) return val
        const current =
          typeof val === 'number' ? val : defaultCurrent !== undefined ? defaultCurrent : defaultMax
        return { current, max: defaultMax }
      }

      return {
        ...rec,
        health: convert(rec.health, 100, 100),
        hungry: convert(rec.hungry, 100, 0),
        magic: convert(rec.magic, 100, 0),
        mana: convert(rec.mana, 100, 0),
        mood: convert(rec.mood, 100, 50),
      }
    })

    if (migrated.length === 0) {
      console.log(LOG_MESSAGES.dexie.migrate.V3toV4.noStatsToMigrate({ method: 'Dexie' }))
    }

    const withId = migrated.filter((r: any) => r.id !== undefined)
    const withoutId = migrated.filter((r: any) => r.id === undefined)

    let updated = 0
    let added = 0

    if (withId.length > 0) {
      try {
        await (statsTable as any).bulkPut(withId)
        updated = withId.length
      } catch (e) {
        console.warn(LOG_MESSAGES.dexie.migrate.V3toV4.statsBulkPutFallback({ method: 'Dexie' }), e)
        for (const rec of withId) {
          try {
            await statsTable.put(rec)
            updated++
          } catch (err) {
            console.warn(
              LOG_MESSAGES.dexie.migrate.V3toV4.statsUpdateFail({ method: 'Dexie' }),
              err
            )
          }
        }
      }
    }

    if (withoutId.length > 0) {
      try {
        await (statsTable as any).bulkAdd(withoutId)
        added = withoutId.length
      } catch (e) {
        console.warn(LOG_MESSAGES.dexie.migrate.V3toV4.statsBulkAddFallback({ method: 'Dexie' }), e)
        for (const rec of withoutId) {
          try {
            await statsTable.add(rec)
            added++
          } catch (err) {
            console.warn(
              LOG_MESSAGES.dexie.migrate.V3toV4.statsInsertFail({ method: 'Dexie' }),
              err
            )
          }
        }
      }
    }

    console.log(
      LOG_MESSAGES.dexie.migrate.V3toV4.migrateSummary({
        method: 'Dexie',
        updated,
        added,
        total: migrated.length,
      })
    )

    // Remove `skills` and `disciplines` fields from existing disciplines_list records
    try {
      const disciplinesTable = tx.table('disciplines_list') as Table<any>
      const allDisc = await disciplinesTable.toArray()
      console.log(
        LOG_MESSAGES.dexie.migrate.V3toV4.disciplinesFound({
          method: 'Dexie',
          count: allDisc.length,
        })
      )

      const sanitized = allDisc.map((rec: any) => {
        const { skills, disciplines, ...rest } = rec
        return rest
      })

      let updatedCount = 0
      if (sanitized.length > 0) {
        try {
          await (disciplinesTable as any).bulkPut(sanitized)
          updatedCount = sanitized.length
        } catch (e) {
          console.warn(
            LOG_MESSAGES.dexie.migrate.V3toV4.disciplinesBulkPutFail({ method: 'Dexie' }),
            e
          )
          for (const rec of sanitized) {
            try {
              await disciplinesTable.put(rec)
              updatedCount++
            } catch (err) {
              console.warn(
                LOG_MESSAGES.dexie.migrate.V3toV4.disciplinesUpdateFail({ method: 'Dexie' }),
                err
              )
            }
          }
        }
      }

      console.log(
        LOG_MESSAGES.dexie.migrate.V3toV4.disciplinesSanitized({
          method: 'Dexie',
          count: updatedCount,
        })
      )
    } catch (err) {
      console.warn(
        LOG_MESSAGES.dexie.migrate.V3toV4.disciplinesSanitizeFail({ method: 'Dexie' }),
        err
      )
    }
  } catch (err) {
    console.error(LOG_MESSAGES.dexie.migrate.V3toV4.migrateError({ method: 'Dexie' }), err)
    throw err
  }
}
