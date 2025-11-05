import { db } from '@/data/db'
import { Save } from '@/data/types'
import { useQuery } from '@tanstack/react-query'

export function getAllSaves(): Save[] | null {
  const { data: saves } = useQuery({
    queryKey: ['saves'],

    queryFn: () => db.saves.toArray()
  })

  return saves && saves.length > 0 ? saves : null
}