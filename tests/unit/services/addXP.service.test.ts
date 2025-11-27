import { addXPService } from '@/services'
import * as repos from '@/infra/repositories'

jest.mock('@/infra/repositories')
jest.mock('@/services/log/logger.service', () => ({ log: { info: jest.fn(), error: jest.fn() } }))

describe('addXPService', () => {
  beforeEach(() => jest.resetAllMocks())

  it('creates a new XP record when none exists', async () => {
    ;(repos.getDisciplineByName as jest.Mock).mockResolvedValue({ type: 'skill' })
    ;(repos.getXPBySaveIdAndDiscipline as jest.Mock).mockResolvedValue(undefined)
    ;(repos.createOrUpdateXP as jest.Mock).mockResolvedValue(undefined)

    await addXPService('save1', 'alchemy', 10)

    expect(repos.createOrUpdateXP).toHaveBeenCalled()
    const created = (repos.createOrUpdateXP as jest.Mock).mock.calls[0][0]
    expect(created.saveId).toBe('save1')
    expect(created.xp).toBe(10)
  })

  it('increments xp when record exists', async () => {
    ;(repos.getDisciplineByName as jest.Mock).mockResolvedValue({ type: 'skill' })
    ;(repos.getXPBySaveIdAndDiscipline as jest.Mock).mockResolvedValue({
      saveId: 's',
      target: 'alchemy',
      xp: 5,
    })
    ;(repos.createOrUpdateXP as jest.Mock).mockResolvedValue(undefined)

    await addXPService('s', 'alchemy', 7)

    const updated = (repos.createOrUpdateXP as jest.Mock).mock.calls[0][0]
    expect(updated.xp).toBe(12)
  })
})
