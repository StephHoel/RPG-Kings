import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { deleteSaveService } from '@/services'
import { log } from '@/services'

export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (saveId: string) => {
      await deleteSaveService(saveId)
    },

    onSuccess: async () => {
      try {
        await queryClient.refetchQueries({ queryKey: useQueryKeys.allSaves(), exact: true })
        await queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive(), exact: true })
        await queryClient.refetchQueries({ queryKey: useQueryKeys.sheetActive(), exact: true })
        await queryClient.refetchQueries({ queryKey: useQueryKeys.statsActive(), exact: true })
      } catch (err) {
        console.error(`[${useDeleteSave.name}] Erro ao invalidar queries após deleção`, err)
      }
    },

    onError: async (err) => {
      const msg = `[${useDeleteSave.name}] Erro ao deletar save`

      console.error(msg, err)

      await log.error(msg, { error: err })
    },
  })
}
