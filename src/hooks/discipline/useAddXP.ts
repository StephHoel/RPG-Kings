import { db } from '@/db'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { log } from '@/lib'
import { LogTypeEnum } from '@/enums'
import { Discipline } from '@/interfaces'

export function useAddXP(saveId: string, discipline: string, xpToAdd?: number | null) {
  const queryClient = useQueryClient()

  return useMutation<boolean, never, void>({
    mutationFn: async () => {
      try {
        const existing = await db.disciplines
          .where({ saveId: saveId, discipline: discipline })
          .first()

        const amountToAdd = xpToAdd ?? 25

        if (!existing) {
          const now = new Date()

          await db.disciplines.add({
            saveId,
            discipline,
            xp: amountToAdd,
            createdAt: now,
            updatedAt: now,
          } as Discipline)

          await log(LogTypeEnum.enum.info, '[useAddXP] Disciplina criada e XP adicionado', { saveId, discipline, xpAdded: amountToAdd, totalXp: amountToAdd })

          return true
        }

        const newXp = (existing.xp ?? 0) + amountToAdd

        const idToUpdate = existing.id as number | undefined
        if (typeof idToUpdate === 'number') {
          await db.disciplines.update(idToUpdate, { xp: newXp, updatedAt: new Date() })
        } else {
          // fallback: replace record
          await db.disciplines.add({ ...existing, xp: newXp, updatedAt: new Date() } as Discipline)
        }

        await log(LogTypeEnum.enum.info, '[useAddXP] XP adicionado', { saveId, discipline, xpAdded: amountToAdd, totalXp: newXp })

        return true
      } catch (err: any) {
        await log(LogTypeEnum.enum.error, '[useAddXP] Erro ao adicionar XP', { saveId, discipline, error: String(err) })

        return false
      }
    },

    onSuccess:  () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.discipline(saveId, discipline) })
    },

    onError: async (err) => {
      await log(LogTypeEnum.enum.error, '[useAddXP] Erro inesperado na mutação', { saveId, discipline, error: String(err) })
    },
  })
}