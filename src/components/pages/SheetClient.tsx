'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data/db'

export default function SheetClient() {
  const params = useParams()
  const saveId = params?.saveId as string

  const { data: sheet } = useQuery({
    queryKey: ['sheet', saveId],
    queryFn: async () => {
      const s = await db.sheets.get(saveId)
      return s ?? null
    },
    enabled: !!saveId,
  })
  const { data: items } = useQuery({
    queryKey: ['inventory', saveId],
    queryFn: async () => db.inventory.where('saveId').equals(saveId).toArray(),
    enabled: !!saveId,
  })

  return (
    <div className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-lg font-semibold">Ficha</h1>
      <pre className="rounded border p-3 bg-gray-50 overflow-auto text-sm">{JSON.stringify(sheet ?? 'Sem sheet', null, 2)}</pre>
      <h2 className="font-medium">Inventário</h2>
      <ul className="space-y-2">
        {!items?.length && "Sem itens"}

        {items?.map(i => (
          <li key={i.id} className="border rounded p-3">
            <div className="font-medium">{i.itemName} ×{i.quantity}</div>
            <div className="text-sm opacity-70">Comprado semana {i.acquiredWeek} · Duração {i.durationWeeks === 0 ? 'ilimitada' : `${i.durationWeeks} semanas`} · Expira {i.expiresAtWeek ?? '—'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
