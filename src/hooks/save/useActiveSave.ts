'use client'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data'
import { Save } from '@/interfaces'
import { useQueryKeys } from '@/hooks'

export function useActiveSave() {
  const { data: active, isLoading, error } = useQuery({
    queryKey: useQueryKeys.saveActive(),

    // Consider data fresh for 1 hour to reduce redundant IndexedDB reads
    staleTime: 1000 * 60 * 60,

    queryFn: async (): Promise<Save | null> => {
      const active = await db.saves.where('isActive').equals(1).first()

      console.log('active save', active)

      return (active as Save) ?? null
    },
  })

  return { activeSaveId: active?.id ?? null, isLoading, error }
}
