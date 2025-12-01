import { LOG_TYPE, LOG_MESSAGES } from '@/domain/constants'
import { createLog } from '@/infra/repositories'
import { log } from '@/services'

jest.mock('@/infra/repositories')

describe('logger.service', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('info message format (message, payload)', async () => {
    ;(createLog as jest.Mock).mockResolvedValue(undefined)

    const logMessage = LOG_MESSAGES.save.deleted({ method: 'LoggerServiceTest', id: 's1' })
    const logPayload = { raw: true }

    await log.info(logMessage, logPayload)

    expect(createLog).toHaveBeenCalledTimes(1)
    const entry = (createLog as jest.Mock).mock.calls[0][0]
    expect(entry.type).toBe(LOG_TYPE.info)
    expect(entry.message).toBe(logMessage)
    expect(entry.payload).toEqual(logPayload)
  })

  it('error message format (message, payload)', async () => {
    ; (createLog as jest.Mock).mockResolvedValue(undefined)
    
    const logMessage = LOG_MESSAGES.save.deleted({ method: 'LoggerServiceTest', id: 's1' })

    await log.error(logMessage, {
      saveId: 's1',
    })

    expect(createLog).toHaveBeenCalledTimes(1)
    const entry = (createLog as jest.Mock).mock.calls[0][0]
    expect(entry.type).toBe(LOG_TYPE.error)
    expect(entry.message).toBe(logMessage)
    expect(entry.payload).toEqual({ saveId: 's1' })
  })

  it('warn message format (message, payload)', async () => {
    ;(createLog as jest.Mock).mockResolvedValue(undefined)

    const logMessage = LOG_MESSAGES.sheet.error.load({ method: 'LoggerServiceTest', id: 's2' })
    await log.warn(logMessage)

    expect(createLog).toHaveBeenCalledTimes(1)
    const entry = (createLog as jest.Mock).mock.calls[0][0]
    expect(entry.type).toBe(LOG_TYPE.warn)
    expect(entry.message).toBe(logMessage)
    expect(entry.payload).toBeUndefined()
  })
})
