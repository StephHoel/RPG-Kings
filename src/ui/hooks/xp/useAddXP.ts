import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { addXPService, log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export function useAddXP(saveId: string, discipline: string, xpToAdd: number) {
  const queryClient = useQueryClient()

  return useMutation<void, never, void>({
    mutationFn: async () => await addXPService(saveId, discipline, xpToAdd),

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.xps(saveId), exact: true })
    },

    onError: async (err) => {
      const msg = LOG_MESSAGES.xp.error.unexpected({ method: useAddXP.name })

      console.error(msg, err)

      await log.error(msg, {
        saveId,
        discipline,
        error: String(err),
      })
    },
  })
}
