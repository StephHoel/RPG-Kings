import { db } from '@/db'
import { Save, SaveId } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/hooks'

export function useGetSave(saveId: SaveId) {
  const queryKey = useQueryKeys.saveId(saveId)

  const { data, isLoading } = useQuery<Save | null>({
    queryKey,
    enabled: !!saveId,
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 30 * 60 * 1000,   // 30 min (ajuste conforme seu app)

    // Normaliza: sempre retorna null se não houver save
    select: (d) => d ?? null,

    queryFn: async () => {
      // quando disabled, a queryFn nem roda
      if (!saveId) return null

      const save = await db.saves.get(saveId)

      return save ?? null
    },
  })

  return { save: data ?? null, isLoading }
}
