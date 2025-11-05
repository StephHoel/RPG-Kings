import { db } from '@/data/db'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { refreshSaves } from '@/hooks'

// hook: mutation que deleta e invalida/refetch das queries de saves
export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (saveId: string) => {
      // await db.saves.delete(saveId)
      console.error("Não foi deletado!")
    },
    onSuccess: () => {
      // centraliza o refresh/invalidation
      refreshSaves(queryClient)
    },
  })
}