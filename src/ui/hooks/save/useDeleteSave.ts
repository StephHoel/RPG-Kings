import { db } from '@/infra/dexie/database'
import { log } from '@/services/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (saveId: string) => {
      try {
        await db.saves.delete(saveId)

        // TODO deletar sheet também

        await log.info('[useDeleteSave] Save deletado', { saveId })
      } catch (err: any) {
        await log.error('[useDeleteSave] Erro ao deletar save', {
          saveId,
          error: String(err),
        })
      }
    },

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      await log.error('[useAddXP] Erro inesperado na mutação', {
        error: String(err),
      })
    },
  })
}
