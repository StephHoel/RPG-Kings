'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetInventory, useGetSheet } from '@/hooks'
import { ROUTES } from '@/config'
import { H1, Panel } from '@/components'

export function SheetClient() {
  const router = useRouter()
  const search = useSearchParams()
  const saveId = search?.get('saveId')

  const back = () => router.push(ROUTES.ROOT)

  if (saveId === null) back()

  const sheet = useGetSheet(saveId!)
  const items = useGetInventory(saveId!)

  return (
    <Panel>
      <H1>Ficha</H1>

      <pre className="bg-gray-500 p-3 border rounded overflow-auto text-sm">{JSON.stringify(sheet ?? 'Sem sheet', null, 2)}</pre>

      <h2 className="font-medium">Inventário</h2>

      <ul className="space-y-2">
        {!items || items.length === 0 ? (
          'Sem itens'
        ) : (
          items.map((i) => (
            <li key={i.id} className="p-3 border rounded">
              <div className="font-medium">{i.name}</div>

              <div className="opacity-70 text-sm">Comprado semana {i.acquiredWeek} · Duração {i.durationWeeks === 0 ? 'ilimitada' : `${i.durationWeeks} semanas`} · Expira {i.expiresAtWeek ?? '—'}</div>
            </li>
          ))
        )}
      </ul>
    </Panel>
  )
}
