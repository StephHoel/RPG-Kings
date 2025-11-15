import { nanoid } from 'nanoid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { db } from '@/db'
import { useQueryKeys } from '@/hooks'
import { Save } from '@/interfaces'
import { log } from '@/lib'
import { LogTypeEnum } from '@/enums'

// Hook que cria o save e atualiza o cache do React Query
export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, string>({
    mutationFn: async (name: string): Promise<string> => {
      // desativar saves ativos anteriores
      await db.saves.toCollection().modify({ isActive: false })

      var saveId = nanoid(10)

      await db.saves.add({
        id: saveId,
        name: name,
        isActive: true,
        currentWeek: 1,
        currentDay: 'Monday',
        currentHour: 8,
      })

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

      log(LogTypeEnum.enum.info, 'Novo Save Criado', {saveId})

      return saveId
    },

    // Otimista: atualiza cache local antes da confirmação (onMutate)
    onMutate: async (name: string) => {
      await queryClient.cancelQueries({ queryKey: useQueryKeys.saveActive() })

      const previousActive = queryClient.getQueryData<Save | null>(useQueryKeys.saveActive())

      // Cria um objeto temporário para mostrar enquanto a mutation acontece
      const tempSave: Save = {
        id: 'temp:' + nanoid(6),
        name: name || 'Novo personagem',
        isActive: true,
        currentWeek: 1,
        currentDay: 'Monday',
        currentHour: 8,
      }

      // Atualiza cache para o novo active temporário
      queryClient.setQueryData(useQueryKeys.saveActive(), tempSave)

      return { previousActive }
    },

    onError: (err, name, context: any) => {
      // rollback para o estado anterior se houve erro
      if (context?.previousActive !== undefined) {
        queryClient.setQueryData(useQueryKeys.saveActive(), context.previousActive)
      }
    },

    onSettled: async () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },
  })
}