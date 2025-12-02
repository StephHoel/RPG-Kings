import { LOG_MESSAGES, LOG_TYPE, LogType } from '@/domain/constants'
import { createLog, getAllLogs, clearLogs as clearLogsRepo } from '@/infra/repositories'

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

async function toLog(type: LogType, message: string, payload?: any) {
  try {
    await createLog({ type, message, payload })
  } catch (err) {
    console.error(LOG_MESSAGES.log.failed({ method: 'LoggerService' }), err)
    throw err
  }
}

export async function exportLogsNDJSON(): Promise<string> {
  const all = await getAllLogs()

  return all.map((x) => JSON.stringify(x)).join('\n')
}

export const getAllLogsService = async () => getAllLogs()

export const clearLogs = async () => await clearLogsRepo()
