'use client'
import { characterSeed } from '@/infra/dexie/seed/character'
import { itemSeed } from '@/infra/dexie/seed/item'
import { questSeed } from '@/infra/dexie/seed/quest'
import { reputationSeed } from '@/infra/dexie/seed/reputation'
import { ruleSeed } from '@/infra/dexie/seed/rule'
import { sceneSeed } from '@/infra/dexie/seed/scene'
import { tagSeed } from '@/infra/dexie/seed/tag'
import { db } from '@/infra/dexie/database'
import { log, safeBulkAdd } from '@/services/lib'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSeedAll() {
  const candidateSeeds: Record<string, any[]> = {
    characters: characterSeed,
    items: itemSeed,
    quests: questSeed,
    reputations: reputationSeed,
    rules: ruleSeed,
    scenes: sceneSeed,
    tags: tagSeed,
  }

  return useMutation<boolean>({
    mutationFn: async (): Promise<boolean> => {
      let anySeeded = false

      for (const [tableName, entries] of Object.entries(candidateSeeds)) {
        const table = (db as any)[tableName]

        if (!table) continue

        const count =
          typeof table.count === 'function' ? await table.count() : (await table.toArray()).length

        if (count > 0) {
          toast.info(`${tableName} já tem dados — pulando`)
          continue
        }

        try {
          if (typeof table.bulkPut === 'function') {
            await safeBulkAdd(table, entries)
          } else if (typeof table.put === 'function') {
            // fallback: inserir um a um
            for (const e of entries) await table.put(e)
          } else {
            console.warn(`Tabela ${tableName} não expõe métodos de escrita conhecidos — pulando`)
            continue
          }

          toast.success(`Semeado ${tableName} (${entries.length} itens)`)
          anySeeded = true
        } catch (err) {
          toast.error(`Falha ao semear ${tableName}`)
          console.error(`Falha ao semear ${tableName}:`, err)

          throw err
        }
      }

      await log.info('Seed executada (debug)')
      toast.success('Seed executada (debug)')

      return anySeeded
    },
  })
}
