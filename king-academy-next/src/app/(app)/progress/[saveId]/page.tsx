'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data/db'

export default function ProgressPage() {
  const params = useParams()
  const saveId = params?.saveId as string

  const { data: milestones } = useQuery({
    queryKey: ['milestones', saveId],
    queryFn: async () => db.milestones.where({ saveId }).toArray(),
    enabled: !!saveId,
  })

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-lg font-semibold mb-3">Progresso</h1>
      <ul className="space-y-2">
        {milestones?.map(m => (
          <li key={m.id} className="border rounded p-3">
            <div className="font-medium">{m.key} ({m.current}/{m.target})</div>
            {m.achievedAtWeek && <div className="text-sm opacity-70">Concluído na semana {m.achievedAtWeek}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
