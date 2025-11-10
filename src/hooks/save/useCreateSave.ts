import { nanoid } from 'nanoid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { db } from '@/data'
import { useQueryKeys } from '@/hooks'
import { Save } from '@/interfaces'

// Hook que cria o save e atualiza o cache do React Query
export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, string>({
    mutationFn: async (name: string): Promise<string> => {
      // desativar saves ativos anteriores
      await db.saves.toCollection().modify({ isActive: false })

      return await db.saves.add({
        id: nanoid(10),
        name: name || 'Novo personagem',
        isActive: true,
        currentWeek: 1,
        currentDay: 'Monday',
        currentHour: 8,
      })
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