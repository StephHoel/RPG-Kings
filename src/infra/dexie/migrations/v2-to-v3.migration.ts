import { Sheet } from '@/infra/schemas'
import { Table, Transaction } from 'dexie'

/**
 * MIGRAÇÃO DA V2 PARA V3
 * -----------------------
 * Aqui você transforma dados antigos para o novo formato.
 * Esse arquivo deve conter APENAS a migração entre essas versões,
 * mantendo Clean Code e SRP.
 */

export async function migrateV2toV3(tx: Transaction) {
  console.log('[Dexie] Iniciando migração da versão 2 → 3...')

  // --------------------------------------------------------------------------------
  // EXEMPLO 1 — Remover tabelas antigas
  // --------------------------------------------------------------------------------

  try {
    await tx.db.table('milestones').clear()
  } catch {}
  try {
    await tx.db.table('settings').clear()
  } catch {}
  try {
    await tx.db.table('disciplines').clear()
  } catch {}

  // --------------------------------------------------------------------------------
  // EXEMPLO 2 — Migrar "disciplines" → "xp_records"
  // Supondo que a tabela antiga era assim:
  //
  // disciplines: {
  //   id: number,
  //   saveId: string,
  //   name: string,
  //   xp: number
  // }
  //
  // E agora deve gerar:
  //
  // xp_records: {
  //   id,
  //   saveId,
  //   type: "class",
  //   target: name,
  //   xp,
  // }
  // --------------------------------------------------------------------------------

  const oldDisciplines = tx.db.table('disciplines') as Table<any, number>
  const xpRecords = tx.db.table('xp_records') as Table<any, number>

  const disciplinesData = await oldDisciplines.toArray()

  for (const d of disciplinesData) {
    // const newRecord = XPRecordSchema.parse({
    //   saveId: d.saveId,
    //   type: 'class', // conversão implícita
    //   target: d.name,
    //   xp: d.xp ?? 0,
    // })
    // await xpRecords.add(newRecord)
  }

  // --------------------------------------------------------------------------------
  // EXEMPLO 3 — Criar tabela stats baseada em sheets
  // (Cada ficha ganha stats base zerados)
  // --------------------------------------------------------------------------------

  const sheets = tx.db.table('sheets') as Table<Sheet, number>
  const stats = tx.db.table('stats') as Table<any, number>

  const allSheets = await sheets.toArray()

  for (const sheet of allSheets) {
    await stats.add({
      saveId: sheet.saveId,
      strength: 0,
      agility: 0,
      intelligence: 0,
      charisma: 0,
      stamina: 0,
      hungry: 100,
      mood: 50,
      health: 100,
      magic: 0,
      mana: 0,
    })
  }

  console.log('[Dexie] Migração v2 → v3 concluída.')
}
