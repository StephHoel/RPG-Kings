import { nanoid } from 'nanoid'
import { db } from '@/infra/dexie/database'
import { log } from '@/services/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { CreateSaveFormValues } from '@/types'

export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateSaveFormValues>({
    mutationFn: async ({ name, race }: CreateSaveFormValues): Promise<string> => {
      // desativar saves ativos anteriores
      await db.saves.toCollection().modify({ isActive: false })

      await log.info('[useCreateSave] Jogos anteriores inativados')

      const saveId = nanoid(10)

      await db.saves.add({
        id: saveId,
        isActive: true,
        currentWeek: 1,
        currentDay: 1,
        currentHour: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await log.info('[useCreateSave] Save criado', { saveId, name })

      // const animal = getAnimal(race)
      // const stats = statsByRace(race, animal)
      // const developSkills = getDevelopSkills(race)
      // const fixedSkills = getFixedSkills(race)

      await db.sheets.add({
        saveId,
        race,
        // animal: animal ?? null,
        coins: 0,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await log.info('[useCreateSave] Ficha de personagem criada', { saveId })

      return saveId
    },

    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      await log.error('[useCreateSave] Erro inesperado na mutação', {
        error: String(err),
      })
    },
  })
}
