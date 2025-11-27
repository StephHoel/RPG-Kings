import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { deleteSaveService } from '@/services'
import { log } from '@/services'

export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (saveId: string) => {
      await deleteSaveService(saveId)

      // TODO implementar deletar sheet service
      // await deleteSheetService(saveId)
    },

    onSuccess: async () => {
      try {
        await queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
        await queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
        await queryClient.refetchQueries({ queryKey: useQueryKeys.sheetActive() })
        await queryClient.refetchQueries({ queryKey: useQueryKeys.statsActive() })
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
