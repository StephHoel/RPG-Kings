import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { addXPService, log } from '@/services'

export function useAddXP(saveId: string, discipline: string, xpToAdd: number) {
  const queryClient = useQueryClient()

  return useMutation<void, never, void>({
    mutationFn: async () => await addXPService(saveId, discipline, xpToAdd),

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.discipline(saveId, discipline) })
    },

    onError: async (err) => {
      const msg = `[${useAddXP.name}] Erro inesperado na mutação`

      console.error(msg, err)

      await log.error(msg, {
        saveId,
        discipline,
        error: String(err),
      })
    },
  })
}
