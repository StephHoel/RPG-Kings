import Dexie, { Table } from 'dexie'
import {
  Save,
  Sheet,
  Scene,
  Milestone,
  Inventory,
  Setting,
  Log,
  Item,
  Discipline,
} from '@/interfaces'
import { safeBulkAdd } from '@/lib'
import { itemSeed } from '@/constants'

class RPGDatabase extends Dexie {
  saves!: Table<Save, string>
  sheets!: Table<Sheet, string>
  scenes!: Table<Scene, string>
  milestones!: Table<Milestone, string>
  inventory!: Table<Inventory, string>
  items!: Table<Item, string>
  settings!: Table<Setting, string>
  logs!: Table<Log, number>
  disciplines!: Table<Discipline, number>

  constructor() {
    super('rpg_db')

    // Versão inicial do schema
    this.version(1).stores({
      saves: 'id, isActive, currentWeek, currentDay, currentHour',
      sheets: 'id, saveId',
      scenes: 'id',
      milestones: '++id, saveId, type, key',
      inventory: '++id, saveId, expiresAtWeek',
      items: 'id',
      settings: 'id',
      logs: '++id, createdAt, type',
      disciplines: '++id, saveId',
    })

    // Exemplo de versão futura com migração
    // Adicione novas versões quando precisar mudar o schema e escreva a migração em .upgrade()
    this.version(2)
      .stores({
        // mantenha os stores (pode adicionar/remover índices aqui)
        saves: 'id, isActive, currentWeek, currentDay, currentHour',
        sheets: 'saveId',
        scenes: 'id, title', // exemplo: novo índice "title"
        milestones: '++id, saveId, type, key',
        inventory: '++id, saveId, expiresAtWeek',
        items: 'id',
        settings: 'id',
        logs: '++id, createdAt, type',
        disciplines: '++id, saveId',
      })
      .upgrade(async (tx) => {
        // Migração: remover o campo "id" das sheets e passar a usar "saveId" como chave primária.
        // Estratégia:
        // - Preencher saveId a partir de id quando saveId faltar.
        // - Consolidar múltiplas sheets com o mesmo saveId mantendo a primeira.
        // - Regravar a tabela sem o campo "id".
        const sheetsTable = tx.table('sheets') as Dexie.Table<any, any>
        const allSheets = await sheetsTable.toArray()
        const bySaveId = new Map<string, any>()

        for (const sheet of allSheets) {
          let saveId = sheet.saveId ?? null
          if (!saveId) {
            if (!sheet.id) continue

            // Se não houver saveId, tente usar o antigo id como fallback; caso contrário gere um id.
            saveId = sheet.id

            // TODO adicionar uma forma de criar sheet se não existir e implementar ao tentar recuperar o sheet tbm
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
      })

    // Popula seed ao criar pela primeira vez
    this.on('populate', async () => {
      await safeBulkAdd(this.items, itemSeed)
    })

    // Feche o DB quando uma outra aba requerer atualização de versão
    this.on('versionchange', () => {
      // Fecha o banco; a app pode avisar o usuário para recarregar
      try {
        this.close()
      } catch (err) {
        console.error(err)
      }
      // opcional: notificar usuário ou recarregar
      if (typeof window !== 'undefined' && window.location) {
        // window.location.reload()
      }
    })

    // Tenta abrir; em caso de erro de versão incompatível, apaga e recria (fallback)
    this.open().catch(async (err) => {
      console.error('Falha ao abrir IndexedDB:', err)
      const isVersionError =
        err && (err.name === 'VersionError' || err.name === 'InvalidStateError')
      if (isVersionError) {
        console.warn(
          'Incompatibilidade de versão detectada. Deletando e recriando DB como fallback.'
        )
        try {
          await Dexie.delete(this.name)
          await this.open()
        } catch (deleteErr) {
          console.error('Não foi possível recriar o DB:', deleteErr)
          throw deleteErr
        }
      } else {
        throw err
      }
    })
  }
}

export const db = new RPGDatabase()
