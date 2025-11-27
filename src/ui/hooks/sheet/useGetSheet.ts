import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SheetModel } from '@/domain/models'
import { getSheetService, log } from '@/services'
import { HookResult } from '@/domain/types'

export function useGetSheet(saveId: SheetModel['saveId']): HookResult<SheetModel> {
  return useQuery({
    queryKey: useQueryKeys.sheetActive(),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        return await getSheetService(saveId)
      } catch (err) {
        const msg = `[${useGetSheet.name}] Erro ao obter ficha`

        console.error(msg, err)

        await log.error(msg, { saveId, error: String(err) })
      }
    },
  })
}
