import { Table, Transaction } from 'dexie'

// Migrate stats numeric resources to objects { current, max }
export async function migrateV3toV4(tx: Transaction) {
  console.log('[Dexie] Iniciando migração da versão 3 → 4...')

  try {
    const statsTable = tx.table('stats') as Table<any>
    const all = await statsTable.toArray()
    console.log(`[Dexie] Stats encontrados: ${all.length}`)

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
      console.log('[Dexie] Nenhum registro para migrar em stats.')
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
        console.warn('[Dexie] bulkPut falhou, fallback para put individual', e)
        for (const rec of withId) {
          try {
            await statsTable.put(rec)
            updated++
          } catch (err) {
            console.warn('[Dexie] Falha ao atualizar registro de stats', err)
          }
        }
      }
    }

    if (withoutId.length > 0) {
      try {
        await (statsTable as any).bulkAdd(withoutId)
        added = withoutId.length
      } catch (e) {
        console.warn('[Dexie] bulkAdd falhou, fallback para add individual', e)
        for (const rec of withoutId) {
          try {
            await statsTable.add(rec)
            added++
          } catch (err) {
            console.warn('[Dexie] Falha ao inserir novo registro de stats', err)
          }
        }
      }
    }

    console.log(
      `[Dexie] Migração v3 → v4 concluída. updated=${updated}, added=${added}, total=${migrated.length}`
    )

    // Remove `skills` and `disciplines` fields from existing disciplines_list records
    try {
      const disciplinesTable = tx.table('disciplines_list') as Table<any>
      const allDisc = await disciplinesTable.toArray()
      console.log(`[Dexie] Disciplines encontrados: ${allDisc.length}`)

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
          console.warn('[Dexie] bulkPut failed for disciplines_list, falling back', e)
          for (const rec of sanitized) {
            try {
              await disciplinesTable.put(rec)
              updatedCount++
            } catch (err) {
              console.warn('[Dexie] Failed to update discipline record', err)
            }
          }
        }
      }

      console.log(`[Dexie] Disciplines sanitized: ${updatedCount}`)
    } catch (err) {
      console.warn('[Dexie] Error sanitizing disciplines_list', err)
    }
  } catch (err) {
    console.error('[Dexie] Erro na migração v3 → v4', err)
    throw err
  }
}
