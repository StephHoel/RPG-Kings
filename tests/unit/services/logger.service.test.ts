import { LOG_TYPE, LOG_MESSAGES } from '@/domain/constants'
import { formatMessage } from '@/domain/utils'
import { createLog } from '@/infra/repositories'
import { log } from '@/services'

jest.mock('@/infra/repositories')

describe('logger.service', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('persists legacy message format (message, payload)', async () => {
    ;(createLog as jest.Mock).mockResolvedValue(undefined)

    await log.info('uma mensagem qualquer', { raw: true })

    expect(createLog).toHaveBeenCalledTimes(1)
    const entry = (createLog as jest.Mock).mock.calls[0][0]
    expect(entry.type).toBe(LOG_TYPE.info)
    expect(entry.message).toBe('uma mensagem qualquer')
    expect(entry.payload).toEqual({ raw: true })
  })

  it('formats message from path with params and payload', async () => {
    ;(createLog as jest.Mock).mockResolvedValue(undefined)

    await log.info(LOG_MESSAGES.save.deleted, { id: 's1' }, { saveId: 's1' })

    expect(createLog).toHaveBeenCalledTimes(1)
    const entry = (createLog as jest.Mock).mock.calls[0][0]
    expect(entry.type).toBe(LOG_TYPE.info)
    const expected = formatMessage(LOG_MESSAGES.save.deleted, { id: 's1' })
    expect(entry.message).toBe(expected)
    expect(entry.payload).toEqual({ saveId: 's1' })
  })

  it('formats message from path with params and no payload', async () => {
    ;(createLog as jest.Mock).mockResolvedValue(undefined)

    await log.warn(LOG_MESSAGES.sheet.load.error, { id: 's2', error: 'boom' })

    expect(createLog).toHaveBeenCalledTimes(1)
    const entry = (createLog as jest.Mock).mock.calls[0][0]
    expect(entry.type).toBe(LOG_TYPE.warn)
    const expected = formatMessage(LOG_MESSAGES.sheet.load.error, { id: 's2', error: 'boom' })
    expect(entry.message).toBe(expected)
    expect(entry.payload).toBeUndefined()
  })
})
