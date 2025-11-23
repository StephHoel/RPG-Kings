import { LOG_TYPE, LogType } from '@/domain/constants'
import { db } from '@/infra/dexie/database'
import { LogSchema } from '@/infra/schemas'

export const log = {
  async error(message: string, payload?: any) {
    await toLog(LOG_TYPE.error, message, payload)
  },

  async info(message: string, payload?: any) {
    await toLog(LOG_TYPE.info, message, payload)
  },
}

async function toLog(type: LogType, message?: string, payload?: any) {
  const entry = {
    type,
    message,
    payload,
  }

  const parsed = LogSchema.parse(entry)

  try {
    await db.logs.add(parsed)
  } catch (err) {
    try {
      const last = await db.logs
        .orderBy('id')
        .reverse()
        .first()
        .catch(() => null)

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

  return all.map((x) => JSON.stringify(x)).join('\n')
}

export async function clearLogs() {
  await db.logs.clear()
}
