'use client'
import { useParams } from 'next/navigation'
import { getInventory, getSheet } from '@/hooks'

export default function SheetClient() {
  const params = useParams()
  const saveId = params?.saveId as string
  const sheet = getSheet(saveId)
  const items = getInventory(saveId)

  return (
    <div className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-lg font-semibold">Ficha</h1>
      <pre className="rounded border p-3 bg-gray-500 overflow-auto text-sm">{JSON.stringify(sheet ?? 'Sem sheet', null, 2)}</pre>
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
