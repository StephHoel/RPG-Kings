import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../../../domain/queryKeys'
import { SheetModel } from '@/domain/models'
import { getSheetService } from '@/services'

export function useGetSheet(saveId: SheetModel['saveId']): SheetModel | undefined {
  const { data: sheet } = useQuery({
    queryKey: useQueryKeys.sheet(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => await getSheetService(saveId),
  })

  return sheet
}
