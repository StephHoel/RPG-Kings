import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { deleteSaveService } from '@/services'
import { log } from '@/services'

export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (saveId: string) => {
      await deleteSaveService(saveId)

      // TODO deletar sheet também
    },

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      const msg = `[${useDeleteSave.name}] Erro ao deletar save`

      console.error(msg, err)

      await log.error(msg, { error: err })
    },
  })
}
