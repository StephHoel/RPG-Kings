import { db } from '@/db'
import { SaveId } from '@/interfaces'
import { log } from '@/lib'
import { LogTypeEnum } from '@/enums'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useDeleteSave() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, SaveId>({
    mutationFn: async (saveId: SaveId) => {
      try {
        await db.saves.delete(saveId)

        // TODO deletar sheet também

        await log(LogTypeEnum.enum.INFO, '[useDeleteSave] Save deletado', { saveId })
      }
      catch (err: any) {
        await log(LogTypeEnum.enum.ERROR, '[useDeleteSave] Erro ao deletar save', { saveId, error: String(err) })
      }
    },

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      await log(LogTypeEnum.enum.ERROR, '[useAddXP] Erro inesperado na mutação', { error: String(err) })
    },
  })
}