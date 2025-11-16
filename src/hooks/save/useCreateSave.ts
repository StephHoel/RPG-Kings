import { nanoid } from 'nanoid'
import { db } from '@/db'
import { log } from '@/lib'
import { LogTypeEnum } from '@/enums'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, string>({
    mutationFn: async (name: string): Promise<string> => {
      // desativar saves ativos anteriores
      await db.saves
        .toCollection()
        .modify({ isActive: false })

      await log(LogTypeEnum.enum.info, '[useCreateSave] Jogos anteriores inativados')

      var saveId = nanoid(10)

      await db.saves.add({
        id: saveId,
        name: name,
        isActive: true,
        currentWeek: 1,
        currentDay: 'Monday',
        currentHour: 8,
      })

      await log(LogTypeEnum.enum.info, '[useCreateSave] Save criado', { saveId, name })

      await db.sheets.add({
        saveId,
        stats: { // TODO pegar de um helper por causa da raça
          strength: 0,
          agility: 0,
          intelligence: 0,
          charisma: 0,
          stamina: 0,
          hungry: 0,
          mood: 0,
          magic: 0,
          health: 0,
          mana: 0,
        },
        developSkills: [], // TODO pegar de um helper por causa da raça
        fixedSkills: [], // TODO pegar de um helper por causa da raça
        coins: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await log(LogTypeEnum.enum.info, '[useCreateSave] Ficha de personagem criada', { saveId })

      return saveId
    },

    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      await log(LogTypeEnum.enum.error, '[useCreateSave] Erro inesperado na mutação', { error: String(err) })
    },
  })
}