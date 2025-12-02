import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { deleteSaveService } from '@/services'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

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
        const msg = LOG_MESSAGES.queries.error.invalidateDelete({
          method: useDeleteSave.name,
        })
        console.error(msg, err)
      }
    },

    onError: async (err, saveId) => {
      const msg = LOG_MESSAGES.save.error.delete({ method: useDeleteSave.name })

      console.error(msg, err)

      await log.error(msg, { saveId, error: err })
    },
  })
}
