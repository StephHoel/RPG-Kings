import { Table, Transaction } from 'dexie'
import { populateDB } from '@/infra/dexie/utils/populateDB'
import { XP_TYPE } from '@/domain/constants'
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
  console.log('[Dexie] Iniciando migração da versão 2 → 3...')

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

    console.log(`[Dexie] Sheets encontradas: ${allSheets.length}`)

    // Reescrever a tabela para forçar nova estrutura (clear + bulkAdd permite ++id ser atribuído)
    await sheetsTable.clear()

    if (allSheets.length > 0) {
      // Remover propriedade id antiga se existir e garantir saveId
      const toInsert = allSheets.map((s) => {
        const { id, ...rest } = s as any

        return {
          ...rest,
          // garante campos mínimos
          name: rest.name ?? 'Unnamed',
          saveId: rest.saveId,
          race: rest.race ?? null,
          coins: rest.coins ?? 0,
          createdAt: rest.createdAt ?? new Date().toISOString(),
          updatedAt: rest.updatedAt ?? new Date().toISOString(),
        }
      })

      try {
        await sheetsTable.bulkAdd(toInsert)
        console.log(`[Dexie] Sheets migradas: ${toInsert.length}`)
      } catch (err) {
        console.error('[Dexie] Erro ao migrar sheets', err)
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
        console.log(`[Dexie] inventory → inventories: ${mapped.length} registros`)
      } catch (err) {
        console.error('[Dexie] Erro ao migrar inventory → inventories', err)
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
        console.log(`[Dexie] disciplines → xp_records: ${mapped.length} registros`)
      } catch (err) {
        console.error('[Dexie] Erro ao migrar disciplines → xp_records', err)
      }
    }
  }

  // 5) Popular *_list via seeds quando aplicável (populateDB usa safeBulkAdd)
  try {
    // populateDB espera receber a instância do DB; tx.db é a instância do Dexie
    await populateDB(tx.db as RPGDatabase)
    console.log('[Dexie] Seeds aplicadas via populateDB')
  } catch (err) {
    console.warn('[Dexie] populateDB falhou (ok se já populado):', err)
  }

  // Limpeza: remover tabela `milestones` e `settings` se existir
  const tablesToClear = ['milestones', 'settings']

  for (const table of tablesToClear) {
    if (hasTable(tx, table)) {
      clearTable(tx.table(table))
    }
  }

  console.log('[Dexie] Migração v2 → v3 concluída.')
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
    console.log(`[Dexie] Backup criado: ${backupName} (${all.length} registros)`)
  } catch (err) {
    // Não crítico: apenas log
    console.warn('[Dexie] Não foi possível criar backup para', name, err)
  }
  return all.length
}

async function clearTable(table: AnyTable) {
  try {
    await table.clear()

    console.log(`[Dexie] tabela ${table.name} removida conforme política`)
  } catch (e) {
    console.warn(`[Dexie] Falha ao limpar tabela ${table.name} (não crítico)`, e)
  }
}
