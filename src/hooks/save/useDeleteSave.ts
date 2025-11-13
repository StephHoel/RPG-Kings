import { useMutation, useQueryClient } from '@tanstack/react-query'
import { db } from '@/db'
import { SaveId } from '@/interfaces'
import { useQueryKeys } from '@/hooks'

export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, SaveId>({
    mutationFn: async (saveId: SaveId) => {
      await db.saves.delete(saveId)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: useQueryKeys.saves() })

      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },
  })
}