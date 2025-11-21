'use client'
import { useRouter } from 'next/router'
import { useGetMilestones } from '@/hooks'
import { ROUTES } from '@/config'
import { H1, Panel } from '@/components'
import { Suspense } from 'react'
import Head from 'next/head'

export default function Progress() {
  const router = useRouter()
  const query = router.query
  const saveId = Array.isArray(query.saveId) ? query.saveId[0] : query.saveId

  const back = () => router.push(ROUTES.ROOT)

  if (!router.isReady) return null

  if (!saveId) {
    back()
    return null
  }

  const milestones = useGetMilestones(saveId!)

  return (<>
    <Head>
      <title>Progresso</title>
    </Head>
    
    <Suspense fallback={<div>Carregando...</div>}>
      <Panel>
        <H1>Progresso</H1>

        <ul className="space-y-2">
          {!milestones || milestones.length === 0 ? (
            'Sem progressos registrados'
          ) : (
            milestones.map((m) => (
              <li key={m.id} className="p-3 border rounded">
                <div className="font-medium">{m.description}</div>

                <div className={`text-sm opacity-70 ${m.achievedAtWeek ? 'visible' : 'hidden'}`}>
                  Concluído na semana {m.achievedAtWeek}
                </div>
              </li>
            ))
          )}
        </ul>
      </Panel>
    </Suspense>
  </>)
}
