import Dexie, { Table } from 'dexie'
import { safeBulkAdd } from '@/services/lib'
import { itemSeed } from '@/infra/dexie/seed/item'
import { Discipline, Inventory, ItemList, Log, Save, Scene, Sheet } from '@/infra/schemas'
import { registerV1, registerV2, registerV3 } from './versioning'

class RPGDatabase extends Dexie {
  saves!: Table<Save, string>
  sheets!: Table<Sheet, string>
  scenes!: Table<Scene, string>
  inventory!: Table<Inventory, string>
  items!: Table<ItemList, string>
  logs!: Table<Log, number>
  disciplines!: Table<Discipline, number>

  constructor() {
    super('rpg_db')

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
registerV1(db)
registerV2(db)
registerV3(db)
