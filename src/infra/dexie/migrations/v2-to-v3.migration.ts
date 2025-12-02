import { Table, Transaction } from 'dexie'
import { populateDB } from '@/infra/dexie/utils/populateDB'
import { LOG_MESSAGES, XP_TYPE } from '@/domain/constants'
import { RPGDatabase } from '../database'

type AnyTable = Table<any, any>

/**
 * MIGRAÇÃO DA V2 PARA V3
 * -----------------------
 * Aqui você transforma dados antigos para o novo formato.
 * Esse arquivo deve conter APENAS a migração entre essas versões,
 * mantendo Clean Code e SRP.
 */
export async function migrateV2toV3(tx: Transaction) {
  console.log(LOG_MESSAGES.dexie.migrate.V2toV3.start({ method: 'Dexie' }))

  // 1) Detectar stores legados e usados no código e criar backups (exceto milestones)
  const legacyToCheck = ['sheets', 'inventory', 'disciplines', 'saves']

  for (const name of legacyToCheck) {
    if (hasTable(tx, name)) {
      await backupTable(tx, name)
    }
  }

  // 2) Migrar `sheets`: re-inserir para garantir auto-increment id e &saveId
  if (hasTable(tx, 'sheets')) {
    const sheetsTable = tx.table('sheets') as AnyTable
    const allSheets = await sheetsTable.toArray()

    console.log(
      LOG_MESSAGES.dexie.migrate.V2toV3.foundSheets({ method: 'Dexie', count: allSheets.length })
    )

    // Recreate-and-copy: re-insert records without `id` so the new store (++id) assigns PKs.
    if (allSheets.length > 0) {
      const toInsert = allSheets.map((s) => {
        const { id, ...rest } = s as any

        return {
          // preserve original id as legacyId for traceability
          legacyId: typeof id === 'number' ? id : null,
          // do NOT include `id` so bulkAdd assigns a new ++id
          ...rest,
          name: rest.name ?? 'Unnamed',
          saveId: rest.saveId,
          race: rest.race ?? null,
          coins: rest.coins ?? 0,
          createdAt: rest.createdAt ?? new Date().toISOString(),
          updatedAt: rest.updatedAt ?? new Date().toISOString(),
        }
      })

      try {
        // clear and bulkAdd so Dexie assigns new auto-increment ids
        await sheetsTable.clear()
        await sheetsTable.bulkAdd(toInsert)
        console.log(
          LOG_MESSAGES.dexie.migrate.V2toV3.migratedSheets({
            method: 'Dexie',
            count: toInsert.length,
          })
        )
      } catch (err) {
        console.error(
          LOG_MESSAGES.dexie.migrate.V2toV3.migrateError({ method: 'Dexie', step: 'sheets' }),
          err
        )
      }
      // Build mapping legacyId -> newId to update dependent tables
      try {
        const migrated = await tx
          .table('sheets')
          .filter((r: any) => r.legacyId != null)
          .toArray()
        const idMap = new Map<number, number>()
        for (const rec of migrated) {
          if (typeof rec.legacyId === 'number' && typeof rec.id === 'number') {
            idMap.set(rec.legacyId, rec.id)
          }
        }

        if (idMap.size > 0) {
          console.log(
            LOG_MESSAGES.dexie.migrate.V2toV3.sheetIdMap({ method: 'Dexie', count: idMap.size })
          )

          const candidateTables = [
            'milestones',
            'inventory',
            'inventories',
            'xp_records',
            'stats',
            'logs',
            'animals_list',
            'disciplines_list',
            'skills_list',
            'scenes_list',
            'items_list',
          ]

          for (const tname of candidateTables) {
            if (!hasTable(tx, tname)) continue
            const t = tx.table(tname) as AnyTable
            try {
              const all = await t.toArray()
              const toUpdate: any[] = []
              for (const row of all) {
                if (row && typeof row.sheetId === 'number') {
                  const newId = idMap.get(row.sheetId)
                  if (newId && newId !== row.sheetId) {
                    row.sheetId = newId
                    toUpdate.push(row)
                  }
                }
              }
              if (toUpdate.length > 0) {
                await t.bulkPut(toUpdate)
                console.log(
                  LOG_MESSAGES.dexie.migrate.V2toV3.updatedReferences({
                    method: 'Dexie',
                    table: tname,
                    count: toUpdate.length,
                  })
                )
              }
            } catch (err) {
              console.warn(
                LOG_MESSAGES.dexie.migrate.V2toV3.updateReferencesFail({
                  method: 'Dexie',
                  table: tname,
                }),
                err
              )
            }
          }
        }
      } catch (err) {
        console.warn(LOG_MESSAGES.dexie.migrate.V2toV3.sheetIdMapFail({ method: 'Dexie' }), err)
      }
    }
  }

  // 3) inventory -> inventories
  if (hasTable(tx, 'inventory')) {
    const oldTable = tx.table('inventory') as AnyTable
    const all = await oldTable.toArray()
    const target = hasTable(tx, 'inventories') ? (tx.table('inventories') as AnyTable) : null

    if (target) {
      const mapped = all.map((it: any) => ({
        // preserve id if present else let DB assign
        ...(it.id ? { id: it.id } : {}),
        saveId: it.saveId,
        item: it.item ?? it.name ?? null,
        type: it.type ?? null,
        acquiredWeek: it.acquiredWeek ?? 0,
        durationWeeks: it.durationWeeks ?? null,
        expiresAtWeek: it.expiresAtWeek ?? null,
        usedAtWeek: it.usedAtWeek ?? null,
        createdAt: it.createdAt ?? new Date().toISOString(),
        updatedAt: it.updatedAt ?? new Date().toISOString(),
      }))

      try {
        await target.bulkAdd(mapped)
        console.log(
          LOG_MESSAGES.dexie.migrate.V2toV3.migratedInventories({
            method: 'Dexie',
            count: mapped.length,
          })
        )
      } catch (err) {
        console.error(
          LOG_MESSAGES.dexie.migrate.V2toV3.migrateError({ method: 'Dexie', step: 'inventory' }),
          err
        )
      }
    }
  }

  // 4) disciplines (v2) -> xp_records (v3)
  //    O store antigo `disciplines` armazenava disciplinas por save; em v3 temos `xp_records`
  //    Mapear: cada registro de `disciplines` vira um XPRecord com type=class e target=name (discipline enum)
  if (hasTable(tx, 'disciplines')) {
    const oldTable = tx.table('disciplines') as AnyTable
    const all = await oldTable.toArray()
    const xpTarget = hasTable(tx, 'xp_records') ? (tx.table('xp_records') as AnyTable) : null
    if (xpTarget) {
      const mapped = all.flatMap((it: any) => {
        // em v2 podem existir registros por save com xp ou sem
        const saveId = it.saveId
        const name = it.name
        const xp = typeof it.xp === 'number' ? it.xp : 0

        // caso não haja saveId ou name, ignorar
        if (!saveId || !name) return []

        return [
          {
            saveId,
            type: XP_TYPE.class,
            target: name,
            xp,
          },
        ]
      })

      try {
        if (mapped.length > 0) {
          await xpTarget.bulkAdd(mapped)
        }
        console.log(
          LOG_MESSAGES.dexie.migrate.V2toV3.migratedDisciplines({
            method: 'Dexie',
            count: mapped.length,
          })
        )
      } catch (err) {
        console.error(
          LOG_MESSAGES.dexie.migrate.V2toV3.migrateError({ method: 'Dexie', step: 'disciplines' }),
          err
        )
      }
    }
  }

  // 5) Popular *_list via seeds quando aplicável (populateDB usa safeBulkAdd)
  try {
    // populateDB espera receber a instância do DB; tx.db é a instância do Dexie
    await populateDB(tx.db as RPGDatabase)
    console.log(LOG_MESSAGES.dexie.migrate.V2toV3.seedsApplied({ method: 'Dexie' }))
  } catch (err) {
    console.warn(LOG_MESSAGES.dexie.migrate.V2toV3.seedsApplyFail({ method: 'Dexie' }), err)
  }

  // Limpeza: remover tabela `milestones` e `settings` se existir
  const tablesToClear = ['milestones', 'settings']

  for (const table of tablesToClear) {
    if (hasTable(tx, table)) {
      clearTable(tx.table(table))
    }
  }

  console.log(LOG_MESSAGES.dexie.migrate.V2toV3.end({ method: 'Dexie' }))
}

// Helper: verifica se uma table existe no transaction (evita erros se store não existir)
function hasTable(tx: Transaction, name: string) {
  try {
    // tx.table lançará erro se a store não existir
    tx.table(name)
    return true
  } catch {
    return false
  }
}

// Backup de tabela: grava cópia em backup_<name> (se suportado)
async function backupTable(tx: Transaction, name: string) {
  if (!hasTable(tx, name)) return 0
  const table = tx.table(name) as AnyTable
  const all = await table.toArray()
  const backupName = `backup_${name}_v2`
  try {
    // criar tabela de backup se existir (se não existir, tx.table pode lançar)
    // tentamos inserir via tx.table; se não existir, pulamos
    // @ts-ignore
    const backupTable = tx.table(backupName) as AnyTable
    if (backupTable) {
      await backupTable.clear()
      if (all.length > 0) await backupTable.bulkPut(all)
    }
    console.log(
      LOG_MESSAGES.dexie.migrate.V2toV3.backupCreated({
        method: 'Dexie',
        backupName,
        count: all.length,
      })
    )
  } catch (err) {
    // Não crítico: apenas log
    console.warn(LOG_MESSAGES.dexie.migrate.V2toV3.backupFail({ method: 'Dexie', name }), err)
  }
  return all.length
}

async function clearTable(table: AnyTable) {
  try {
    await table.clear()

    console.log(
      LOG_MESSAGES.dexie.migrate.V2toV3.tableCleared({ method: 'Dexie', table: table.name })
    )
  } catch (e) {
    console.warn(
      LOG_MESSAGES.dexie.migrate.V2toV3.tableClearFail({ method: 'Dexie', table: table.name }),
      e
    )
  }
}
