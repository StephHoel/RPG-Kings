'use client'
import {
  characterSeed,
  itemSeed,
  milestoneSeed,
  questSeed,
  reputationSeed,
  ruleSeed,
  sceneSeed,
  tagSeed,
} from '@/constants'
import { db } from '@/db'
import { LogTypeEnum } from '@/enums'
import { log, safeBulkAdd } from '@/lib'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSeedAll() {
  const candidateSeeds: Record<string, any[]> = {
    characters: characterSeed,
    items: itemSeed,
    milestones: milestoneSeed,
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

      await log(LogTypeEnum.enum.INFO, 'Seed executada (debug)')
      toast.success('Seed executada (debug)')

      return anySeeded
    },
  })
}
