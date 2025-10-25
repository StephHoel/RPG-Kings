'use client'
import { useState } from 'react'
import { db } from '@/data/db'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

export default function SaveNewPage() {
  const [name, setName] = useState('')
  const router = useRouter()

  async function create() {
    const id = nanoid(10)
    const now = Date.now()
    await db.saves.toCollection().modify({ isActive: false })
    await db.saves.add({
      id,
      name: name || 'Novo personagem',
      createdAt: now,
      updatedAt: now,
      isActive: true,
      currentWeek: 1,
      currentDay: 1,
      currentHour: 8,
    })
    router.push(`/game/${id}`)
  }

  return (
    <div className="mx-auto max-w-xl p-4 space-y-3">
      <h1 className="text-lg font-semibold">Criar save</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="Nome do personagem" value={name} onChange={(e) => setName(e.target.value)} />
      <button className="border rounded-lg px-4 py-2" onClick={create}>Criar</button>
    </div>
  )
}
