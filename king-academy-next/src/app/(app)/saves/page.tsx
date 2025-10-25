'use client'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data/db'
import { useRouter } from 'next/navigation'

export default function SavesPage() {
  const router = useRouter()
  const { data: saves } = useQuery({ queryKey: ['saves'], queryFn: () => db.saves.toArray() })

  return (
    <div className="mx-auto max-w-xl p-4 space-y-3">
      <h1 className="text-lg font-semibold">Saves</h1>
      <button className="border rounded-lg px-4 py-2" onClick={() => router.push('/saves/new')}>Novo save</button>
      <ul className="divide-y">
        {saves?.map((s) => (
          <li key={s.id} className="py-2 flex items-center justify-between">
            <span>{s.name}</span>
            <div className="flex gap-2">
              <button className="border rounded px-3 py-1" onClick={() => router.push(`/game/${s.id}`)}>Ativar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
