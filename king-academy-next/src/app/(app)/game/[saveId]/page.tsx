'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data/db'
import { resolveSceneForNow } from '@/utils/timeslot'
import { SceneCard } from '@/components/SceneCard'
import { ChoiceList } from '@/components/ChoiceList'

export default function GamePage() {
  const params = useParams()
  const saveId = params?.saveId as string | undefined

  const { data: save } = useQuery({
    queryKey: ['save', saveId],
    queryFn: async () => (saveId ? db.saves.get(saveId) : undefined),
    enabled: !!saveId,
  })

  const { data: scene } = useQuery({
    queryKey: ['timeslots', 'scene', saveId, save?.currentWeek, save?.currentDay, save?.currentHour],
    queryFn: async () => {
      if (!saveId || !save) return null
      return resolveSceneForNow(save)
    },
    enabled: !!save,
  })

  return (
    <div className="space-y-3">
      <SceneCard>
        <h2 className="m-0">{scene?.title ?? '—'}</h2>
        <p>{scene?.content ?? 'Nenhuma cena disponível neste horário.'}</p>
      </SceneCard>
      <ChoiceList />
    </div>
  )
}
