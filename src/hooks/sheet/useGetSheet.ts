import { db } from '@/db'
import { Sheet } from '@/interfaces'
import { log } from '@/lib'
import { LogTypeEnum } from '@/enums'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetSheet(saveId: string): Sheet | null {
  const {data: sheet} = useQuery({
    queryKey: useQueryKeys.sheet(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        const s = await db.sheets.get(saveId)

        await log(LogTypeEnum.enum.INFO, '[useGetSheet] Ficha obtida', { saveId, present: !!s })

        return s ?? null
      } catch (err: any) {
        await log(LogTypeEnum.enum.ERROR, '[useGetSheet] Erro ao obter ficha', { saveId, error: String(err) })
        throw err
      }
    },
  })

  return sheet ?? null
}