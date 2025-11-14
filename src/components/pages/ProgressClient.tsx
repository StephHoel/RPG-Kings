'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetMilestones } from '@/hooks'
import { ROUTES } from '@/config'
import { H1, Panel } from '@/components'

export function ProgressClient() {
  const router = useRouter()
  const search = useSearchParams()
  const saveId = search?.get('saveId')

  const back = () => router.push(ROUTES.ROOT)

  if (saveId === null) back()

  const milestones = useGetMilestones(saveId!)

  return (
    <Panel>
      <H1>Progresso</H1>

      <ul className="space-y-2">
        {!milestones?.length && 'Sem progressos registrados'}

        {milestones?.map(m => (
          <li key={m.id} className="border rounded p-3">
            <div className="font-medium">{m.description}</div>

            <div className={`text-sm opacity-70 ${m.achievedAtWeek ? 'visible' : 'hidden'}`}>
              Concluído na semana {m.achievedAtWeek}
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
