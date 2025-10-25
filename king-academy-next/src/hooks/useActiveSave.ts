'use client'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data/db'

export function useActiveSave() {
  const { data: active } = useQuery({
    queryKey: ['saves','active'],
    queryFn: async () => db.saves.where({ isActive: true }).first(),
  })
  return { activeSaveId: active?.id ?? null }
}
