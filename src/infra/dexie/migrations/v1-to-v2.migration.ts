import { Table, Transaction } from 'dexie'

/**
 * MIGRAÇÃO DA V1 PARA V2
 * -----------------------
 * Aqui você transforma dados antigos para o novo formato.
 * Esse arquivo deve conter APENAS a migração entre essas versões,
 * mantendo Clean Code e SRP.
 */
export async function migrateV1toV2(tx: Transaction) {
  console.log('[Dexie] Iniciando migração da versão 1 → 2...')

  // Migração: remover o campo "id" das sheets e passar a usar "saveId" como chave primária.
  // Estratégia:
  // - Preencher saveId a partir de id quando saveId faltar.
  // - Consolidar múltiplas sheets com o mesmo saveId mantendo a primeira.
  // - Regravar a tabela sem o campo "id".
  const sheetsTable = tx.table('sheets') as Table<any, any>
  const allSheets = await sheetsTable.toArray()
  const bySaveId = new Map<string, any>()

  for (const sheet of allSheets) {
    let saveId = sheet.saveId ?? null
    if (!saveId) {
      if (!sheet.id) continue

      // Se não houver saveId, tente usar o antigo id como fallback; caso contrário gere um id.
      saveId = sheet.id

      // TODO criar sheet se não existir e implementar ao tentar recuperar o sheet tbm
    }

    if (!bySaveId.has(saveId)) {
      // Remover o campo "id" e garantir que saveId exista
      const { id, ...rest } = { ...sheet, saveId }
      bySaveId.set(saveId, rest)
    } else {
      // Se existirem múltiplas sheets para o mesmo saveId, ignoramos as posteriores.
      // Alternativamente, aqui você pode implementar uma lógica de merge se necessário.
    }
  }

  // Substitui a tabela por registros normalizados (sem "id")
  await sheetsTable.clear()
  if (bySaveId.size > 0) {
    await sheetsTable.bulkPut(Array.from(bySaveId.values()))
  }

  console.log('[Dexie] Migração v1 → v2 concluída.')
}
