'use client'
import { seedAll } from '@/data/seed'
import { useState } from 'react'

export default function SeedDevClient() {
  const [done, setDone] = useState(false)

  const run = async () => {
    await seedAll()
    setDone(true)
  }

  return (
    <div className="mx-auto max-w-xl p-4 space-y-3">
      <h1 className="text-lg font-semibold">Seed de Cenas & Timeslots</h1>
      <button className="border rounded px-4 py-2" onClick={run}>Rodar seed</button>
      {done && <div className="text-green-600">Seed concluído!</div>}
    </div>
  )
}
