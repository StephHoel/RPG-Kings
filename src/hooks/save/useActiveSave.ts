'use client'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/db'
import { Save } from '@/interfaces'
import { useQueryKeys } from '@/hooks'

export function useActiveSave() {
  const { data: active, isLoading, error } = useQuery({
    queryKey: useQueryKeys.saveActive(),

    // Consider data fresh for 1 hour to reduce redundant IndexedDB reads
    staleTime: 1000 * 60 * 60,

    queryFn: async (): Promise<Save | null> => {
      const active = await db.saves.filter(s => s?.isActive === true).first()

      return active ?? null
    },
  })

  return { activeSaveId: active?.id ?? null, isLoading, error }
}
