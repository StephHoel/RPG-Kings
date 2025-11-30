import { LOG_TYPE, LogType } from '@/domain/constants'
import { createLog, getAllLogs, clearLogs as clearLogsRepo } from '@/infra/repositories'
import { buildMessage } from '@/domain/utils'

export const log = {
  async error(template: string, params?: Record<string, any>, payload?: any) {
    await toLog(LOG_TYPE.error, template, params, payload)
  },

  async info(template: string, params?: Record<string, any>, payload?: any) {
    await toLog(LOG_TYPE.info, template, params, payload)
  },

  async warn(template: string, params?: Record<string, any>, payload?: any) {
    await toLog(LOG_TYPE.warn, template, params, payload)
  },
}

async function toLog(type: LogType, template: string, params?: Record<string, any>, payload?: any) {
  const message = buildMessage(template, params)

  try {
    await createLog({ type, message, payload })
  } catch (err) {
    console.error('[LoggerService] Falha ao gravar log:', err)
    throw err
  }
}

export async function exportLogsNDJSON(): Promise<string> {
  const all = await getAllLogs()

  return all.map((x) => JSON.stringify(x)).join('\n')
}

export const getAllLogsService = async () => getAllLogs()

export const clearLogs = async () => await clearLogsRepo()
