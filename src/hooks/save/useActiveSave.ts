import { db } from '@/db'
import { LogTypeEnum } from '@/enums'
import { log } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useActiveSave() {
  const { data: active, isLoading, error } = useQuery({
    queryKey: useQueryKeys.saveActive(),
    staleTime: 60_000 * 60, // 60 minutes

    queryFn: async () => {
      try {
        const active = await db.saves
          .filter(s => s.isActive === true)
          .first()

        await log(LogTypeEnum.enum.info, '[useActiveSave] Jogo ativo obtido', { active })

        return active ?? null
      }
      catch (err: any) {
        await log(LogTypeEnum.enum.error, '[useActiveSave] Erro ao obter jogo ativo', { error: String(err) })
        throw err
      }
    },
  })

  return { activeSaveId: active?.id ?? null, isLoading, error }
}
