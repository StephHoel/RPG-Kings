import { db } from '@/db'
import { LogRow } from '@/interfaces'
import { LogRowSchema } from '@/schemas'

export async function log(
  type: LogRow['type'],
  message?: string,
  payload?: any
) {
  const entry = {
    type,
    message,
    payload,
  }

  const parsed = LogRowSchema.parse(entry)

  try {
    await db.logs.add(parsed)
  } catch (err) {
    try {
      const last = await db.logs.orderBy('id').reverse().first().catch(() => null)

      const lastIdNum = last && typeof last.id === 'number' ? last.id : 0

      await db.logs.add({ ...parsed, id: lastIdNum + 1 })
    } catch (err2) {
      console.error('Falha ao gravar log:', err, err2)

      throw err2
    }
  }
}

export async function exportLogsNDJSON(): Promise<string> {
  const all = await db.logs.orderBy('createdAt').toArray()

  return all.map(x => JSON.stringify(x)).join('\n')
}

export async function clearLogs() {
  await db.logs.clear()
}
