'use client'
import { useEffect, useMemo, useState } from 'react'
import { exportLogsNDJSON, clearLogs } from '@/libs'
import { LogRow } from '@/data/types'
import { db } from '@/data/db'
import { seedAllIfEmpty } from '@/data/seed'

export default function DebugClient() {
  const [logs, setLogs] = useState<LogRow[]>([])
  const [type, setType] = useState<LogType | 'all'>('all')
  const [q, setQ] = useState('')

  const formatTs = (ts: Date) => ts?.toLocaleString() ?? 'Sem data'

  type LogType = LogRow['type']

  useEffect(() => {
    let cancelled = false

    // 1) roda seed automaticamente se estiver vazio
    seedAllIfEmpty().then(() => {
      // 2) carrega logs
      db.logs.orderBy('ts').toArray().then((rows) => {
        if (!cancelled) setLogs(rows)
      })
    })

    // 3) polling simples (1.5s) para ver mudanças
    const interval = setInterval(async () => {
      const rows = await db.logs.orderBy('ts').toArray()
      setLogs(rows)
    }, 1500)

    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  const filtered = useMemo(() => {
    return logs
      .filter(r => (type === 'all' || r.type === type))
      .filter(r => {
        if (!q) return true

        const hay = `${r.type} ${r.message ?? ''} ${JSON.stringify(r.payload ?? '')} ${JSON.stringify(r.createdAt ?? '')}`.toLowerCase()

        return hay.includes(q.toLowerCase())
      })
  }, [logs, type, q])

  async function onCopy() {
    const ndjson = await exportLogsNDJSON()
    await navigator.clipboard.writeText(ndjson)
    alert('Log copiado (NDJSON).')
  }

  async function onClear() {
    if (!confirm('Apagar todos os logs locais?')) return
    await clearLogs()
    const rows = await db.logs.orderBy('ts').toArray()
    setLogs(rows)
  }

  const types: (LogType | 'all')[] = ['all', 'scene_start', 'scene_end', 'roll', 'milestone_unlock', 'toast', 'network', 'error', 'info']

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">/debug – Logs locais</h1>

      <div className="flex gap-2 items-center flex-wrap">
        <select className="border px-2 py-1 rounded" value={type} onChange={e => setType(e.target.value as any)}>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          className="border px-2 py-1 rounded w-64"
          placeholder="filtrar texto…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button onClick={onCopy} className="border px-3 py-1 rounded">Copiar (NDJSON)</button>
        <button onClick={onClear} className="border px-3 py-1 rounded">Apagar</button>
        <span className="text-sm text-gray-500">Total: {filtered.length}</span>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">createdAt</th>
              <th className="text-left p-2">type</th>
              <th className="text-left p-2">message</th>
              <th className="text-left p-2">payload</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-2 whitespace-nowrap">{formatTs(r.createdAt)}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.message ?? '—'}</td>
                <td className="p-2"><pre className="whitespace-pre-wrap">{JSON.stringify(r.payload ?? {}, null, 0)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">Local-only (Dexie). Nenhum dado é enviado para servidores.</p>
    </div>
  )
}
