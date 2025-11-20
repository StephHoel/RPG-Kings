'use client'
import { Button, GenericTable, H1, Input, Panel } from '@/components'
import { LogTypeEnum } from '@/enums'
import { db } from '@/db'
import { LogCategoryLabels, Log } from '@/interfaces'
import { exportLogsNDJSON, clearLogs, formatDate, formatPayload } from '@/lib'
import { useState, useEffect, useMemo, Activity } from 'react'
import { toast } from 'sonner'

export function DebugClient() {
  const [logs, setLogs] = useState<Log[]>([])
  const [type, setType] = useState<LogCategoryLabels>('all')
  const [q, setQ] = useState('')
  const [sortAsc, setSortAsc] = useState<boolean>(false)

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

    return out
  }, [logs, type, q, sortAsc])

  async function onCopy() {
    const ndjson = await exportLogsNDJSON()

    await navigator.clipboard.writeText(ndjson)

    toast.success('Log copiado (NDJSON).')
  }

  async function onClear() {
    if (!confirm('Apagar todos os logs locais?'))
    {
      return
    }

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
      render: (r: Log) => formatDate(r.createdAt)
    },
    {
      key: 'type',
      label: 'Type',
      render: (r: Log) => r.type
    },
    {
      key: 'message',
      label: 'Message',
      render: (r: Log) => r.message ?? '—'
    },
    {
      key: 'payload',
      label: 'Payload',
      render: (r: Log) => (
        <pre className="whitespace-pre-wrap">
          {formatPayload(r.payload)}
        </pre>
      )
    },
  ]

  return (
    <Panel>
      <div>
        <H1>/debug – Logs locais</H1>

        <p className="text-xs">Local-only (Dexie). Nenhum dado é enviado para servidor.</p>
      </div>

      <div className={`flex gap-2 flex-wrap  ${filtered.length === 0 ? 'hidden' : 'visible'}`}>
        <div className='flex sm:flex-row flex-col sm:justify-between md:justify-center sm:items-center gap-2 w-full'>
          <div className='flex items-center gap-2'>
            <span className="min-w-fit text-sm">Total: {filtered.length}</span>

            <select
              aria-label="Filtrar por tipo de log"
              className="px-3 py-2 border border-highlight rounded w-full"
              value={type}
              onChange={e => setType(e.target.value as any)}
            >
              {types.map(t => (
                <option key={t} value={t} className="bg-primary hover:bg-secondary">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className='sm:w-auto md:w-full'>
            <Input
              placeholder="Filtrar texto..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className='w-full'
            />
          </div>
        </div>

        <div className="flex space-x-2 w-full">
          <Button onClick={onCopy} className='min-w-fit'>
            Copiar (NDJSON)
          </Button>

          <Button onClick={onClear}>
            Apagar Logs
          </Button>
        </div>
      </div>

      <div className=" ">
        <Activity mode={filtered.length === 0 ? 'hidden' : 'visible'}>
          <GenericTable
            header={header}
            rows={filtered}
            rowKey={r => r.id ?? Math.random()}
          />
        </Activity>

        <p className={filtered.length === 0 ? 'visible' : 'hidden'}>
          Não há logs disponíveis.
        </p>
      </div>
    </Panel>
  )
}
