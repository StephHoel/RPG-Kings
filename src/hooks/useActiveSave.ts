'use client'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data/db'

export function useActiveSave() {
  const { data: active } = useQuery({
    queryKey: ['saves', 'active'],
    queryFn: async () => {
      const all = await db.saves.toArray()
      return all.find((s: any) => Boolean(s?.isActive)) ?? null
    },
  })
  return { activeSaveId: active?.id ?? null }
}
