import { LOG_TYPE, LogType } from '@/domain/constants'
import { LogModel } from '@/domain/models'
import { createLog, getAllLogs, clearLogs as clearLogsRepo } from '@/infra/repositories'
import { LogSchema } from '@/infra/schemas'

export const log = {
  async error(message: string, payload?: any) {
    await toLog(LOG_TYPE.error, message, payload)
  },

  async info(message: string, payload?: any) {
    await toLog(LOG_TYPE.info, message, payload)
  },

  async warn(message: string, payload?: any) {
    await toLog(LOG_TYPE.warn, message, payload)
  },
}

async function toLog(type: LogType, message?: string, payload?: any) {
  const entry = {
    type,
    message,
    payload,
  }

  const parsed = LogSchema.parse(entry) as LogModel

  try {
    await createLog(parsed)
  } catch (err) {
    console.error('[LoggerService] Falha ao gravar log:', err)
    throw err
  }
}

export async function exportLogsNDJSON(): Promise<string> {
  const all = await getAllLogs()

  return all.map((x) => JSON.stringify(x)).join('\n')
}

export async function getAllLogsService() {
  const { getAllLogs } = await import('@/infra/repositories')
  return getAllLogs()
}

export async function clearLogs() {
  await clearLogsRepo()
}
