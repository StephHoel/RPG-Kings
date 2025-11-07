'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { getMilestones } from '@/hooks'
import { ROUTES } from '@/config/routes'

export default function ProgressClient() {
  const router = useRouter()
  const search = useSearchParams()
  const saveId = search?.get('saveId')
  
  const back = () => router.push(ROUTES.ROOT)
  
  if (saveId === null) back()
  
  const milestones = getMilestones(saveId!)

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-lg font-semibold mb-3">Progresso</h1>
      <ul className="space-y-2">
        {!milestones?.length && "Sem progressos registrados"}

        {milestones?.map(m => (
          <li key={m.id} className="border rounded p-3">
            <div className="font-medium">{m.description}</div>
            {m.achievedAtWeek && <div className="text-sm opacity-70">Concluído na semana {m.achievedAtWeek}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
