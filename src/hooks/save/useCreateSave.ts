import { nanoid } from 'nanoid'
import { db } from '@/db'
import { base, getAnimal, getDevelopSkills, getFixedSkills, log, statsByRace } from '@/lib'
import { LogTypeEnum } from '@/enums'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { CreateSaveFormValues } from '@/interfaces'

export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateSaveFormValues>({
    mutationFn: async ({ name, race }: CreateSaveFormValues): Promise<string> => {
      // desativar saves ativos anteriores
      await db.saves.toCollection().modify({ isActive: false })

      await log(LogTypeEnum.enum.INFO, '[useCreateSave] Jogos anteriores inativados')

      const saveId = nanoid(10)

      await db.saves.add({
        id: saveId,
        name: name,
        isActive: true,
        currentWeek: 1,
        currentDay: 'Monday',
        currentHour: 8,
      })

      await log(LogTypeEnum.enum.INFO, '[useCreateSave] Save criado', { saveId, name })

      const animal = getAnimal(race)
      const stats = statsByRace(race, animal)
      const developSkills = getDevelopSkills(race)
      const fixedSkills = getFixedSkills(race)

      await db.sheets.add({
        saveId,
        race,
        animal: animal ?? null,
        stats: stats ?? base(),
        developSkills,
        fixedSkills,
        coins: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await log(LogTypeEnum.enum.INFO, '[useCreateSave] Ficha de personagem criada', { saveId })

      return saveId
    },

    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      await log(LogTypeEnum.enum.ERROR, '[useCreateSave] Erro inesperado na mutação', {
        error: String(err),
      })
    },
  })
}
