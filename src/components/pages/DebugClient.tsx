'use client'
import { Button, GenericTable, H1, Input, Panel } from '@/components'
import { LogRow, LogCategoryLabels, db, LogTypeEnum } from '@/data'
import { exportLogsNDJSON, clearLogs, formatDate, formatPayload, LogTypeLabels } from '@/libs'
import { useState, useEffect, useMemo, Activity } from 'react'
import { toast } from 'sonner'

export default function DebugClient() {
  const [logs, setLogs] = useState<LogRow[]>([])
  const [type, setType] = useState<LogCategoryLabels>('all')
  const [q, setQ] = useState('')
  const [sortAsc, setSortAsc] = useState<boolean>(false)
  const [isFilteredEmpty, setIsFilteredEmpty] = useState<boolean>(true)

  useEffect(() => {
    db.logs
      .orderBy('createdAt').toArray()
      .then((rows) => { setLogs(rows) })
  }, [])

  const filtered = useMemo(() => {
    const out = logs
      .filter(r => (type === 'all' || r.type === type))
      .filter(r => {
        if (!q) return true

        const hay = `${r.type} ${r.message ?? ''} ${JSON.stringify(r.payload ?? '')} ${JSON.stringify(r.createdAt ?? '')}`.toLowerCase()

        return hay.includes(q.toLowerCase())
      })

    out.sort((a, b) => {
      const ta = new Date(a.createdAt as any).getTime()
      const tb = new Date(b.createdAt as any).getTime()
      return sortAsc ? ta - tb : tb - ta
    })

    setIsFilteredEmpty(out.length === 0)

    return out
  }, [logs, type, q, sortAsc])

  async function onCopy() {
    const ndjson = await exportLogsNDJSON()

    await navigator.clipboard.writeText(ndjson)

    toast('Log copiado (NDJSON).')
  }

  async function onClear() {
    if (!confirm('Apagar todos os logs locais?'))
      return

    await clearLogs()

    const rows = await db.logs.orderBy('createdAt').toArray()

    setLogs(rows)
  }

  const types = ['all', ...LogTypeEnum.options.sort()] as const

  const createdAtLabel = `CreatedAt ${sortAsc ? '↑' : '↓'}`

  const header = [
    {
      key: 'createdAt',
      label: createdAtLabel,
      onHeaderClick: () => setSortAsc(s => !s),
      render: (r: LogRow) => formatDate(r.createdAt)
    },
    {
      key: 'type',
      label: 'Type',
      render: (r: LogRow) => r.type
    },
    {
      key: 'message',
      label: 'Message',
      render: (r: LogRow) => r.message ?? '—'
    },
    {
      key: 'payload',
      label: 'Payload',
      render: (r: LogRow) => (
        <pre className="whitespace-pre-wrap">
          {formatPayload(r.payload)}
        </pre>
      )
    },
  ]

  return (
    <Panel className="text-primary-fg">
      <div>
        <H1>/debug – Logs locais</H1>

        <p className="text-xs ">Local-only (Dexie). Nenhum dado é enviado para servidor.</p>
      </div>

      <div className={`flex gap-2 flex-wrap  ${isFilteredEmpty ? 'hidden' : 'visible'}`}>
        <div className='flex space-x-2 w-full items-center justify-between'>
          <select
            aria-label="Filtrar por tipo de log"
            className="border border-primary-bg px-3 py-2 rounded"
            value={type}
            onChange={e => setType(e.target.value as any)}
          >
            {types.map(t => (
              <option key={t} value={t} className="bg-primary hover:bg-primary-bg hover:text-danger">
                {LogTypeLabels[t]}
              </option>
            ))}
          </select>

          <Input
            placeholder="Filtrar texto..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />

          <span className="text-sm text-gray-500 min-w-fit">Total: {filtered.length}</span>
        </div>

        <div className="flex space-x-2 w-full">
          <Button onClick={onCopy} className=' min-w-fit'>
            Copiar (NDJSON)
          </Button>

          <Button onClick={onClear}>
            Apagar Logs
          </Button>
        </div>
      </div>

      <div className=" ">
        <Activity mode={isFilteredEmpty ? 'hidden' : 'visible'}>
          <GenericTable
            header={header}
            rows={filtered}
            rowKey={r => r.id ?? Math.random()}
          />
        </Activity>

        <p className={isFilteredEmpty ? 'visible' : 'hidden'}>
          Não há logs disponíveis.
        </p>
      </div>
    </Panel>
  )
}
