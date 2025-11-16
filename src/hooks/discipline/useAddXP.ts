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
          .where('saveId')
          .equals(saveId)
          .and(d => d.discipline === discipline)
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

          await log(LogTypeEnum.enum.info, 'XP adicionado', { saveId, discipline, xpAdded: amountToAdd, totalXp: amountToAdd })

          return true
        }

        const newXp = (existing.xp ?? 0) + amountToAdd

        await db.disciplines.update(existing.id as any, { xp: newXp, updatedAt: new Date() })

        await log(LogTypeEnum.enum.info, `XP adicionado: ${amountToAdd} (total ${newXp})`, { saveId, discipline, xpAdded: amountToAdd, totalXp: newXp })

        return true
      } catch (err: any) {
        await log(LogTypeEnum.enum.error, 'Erro ao adicionar XP', { saveId, discipline, error: String(err) })

        return false
      }
    },

    onSuccess: async (data) => {
      try {
        if (data === false) {
          await log(LogTypeEnum.enum.error, 'useAddXP: operação falhou', { saveId, discipline })
        } else {
          try {
            const current = await db.disciplines
              .where('saveId')
              .equals(saveId)
              .and(d => d.discipline === discipline)
              .first()

            await log(LogTypeEnum.enum.info, 'useAddXP: operação bem-sucedida', { saveId, discipline, totalXp: current?.xp ?? null })
          } catch (fetchErr) {
            await log(LogTypeEnum.enum.info, 'useAddXP: sucesso (não foi possível buscar registro atualizado)', { saveId, discipline, fetchError: String(fetchErr) })
          }
        }

        queryClient.invalidateQueries({ queryKey: useQueryKeys.discipline(saveId, discipline) })
      } catch (e) {
        await log(LogTypeEnum.enum.error, 'useAddXP: erro no onSuccess', { saveId, discipline, error: String(e) })
      }
    },
    onError: async (err) => {
        await log(LogTypeEnum.enum.error, 'useAddXP: erro inesperado na mutação', { saveId, discipline, error: String(err) })
    },
  })
}