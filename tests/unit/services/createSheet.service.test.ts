import { createSheetService } from '@/services'
import * as repos from '@/infra/repositories'
import { RACE_ENUM } from '@/domain/constants'

jest.mock('@/infra/repositories')
jest.mock('@/services/log/logger.service', () => ({
  log: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

describe('createSheetService', () => {
  beforeEach(() => jest.resetAllMocks())

  it('creates a sheet for non-shapeshift race and persists it', async () => {
    ;(repos.getAnimalsByRace as jest.Mock).mockResolvedValue([])
    ;(repos.createOrUpdateSheet as jest.Mock).mockResolvedValue(undefined)
    ;(repos.getSheetBySaveId as jest.Mock).mockResolvedValue({
      saveId: 's1',
      name: 'n',
      race: RACE_ENUM.human,
    })

    const res = await createSheetService({ saveId: 's1', name: 'n', race: RACE_ENUM.human })

    expect(repos.createOrUpdateSheet).toHaveBeenCalled()
    expect(repos.getSheetBySaveId).toHaveBeenCalledWith('s1')
    expect(res).toBeDefined()
    expect(res?.saveId).toBe('s1')
  })

  it('selects random animal for shapeshift when available', async () => {
    ;(repos.getAnimalsByRace as jest.Mock).mockResolvedValue(['wolf'])
    ;(repos.createOrUpdateSheet as jest.Mock).mockResolvedValue(undefined)
    ;(repos.getSheetBySaveId as jest.Mock).mockResolvedValue({
      saveId: 's2',
      name: 'n2',
      race: RACE_ENUM.shapeshift,
      animal: 'wolf',
    })

    const res = await createSheetService({ saveId: 's2', name: 'n2', race: RACE_ENUM.shapeshift })

    expect(repos.getAnimalsByRace).toHaveBeenCalledWith(RACE_ENUM.shapeshift)
    expect(res?.animal).toBe('wolf')
  })
})
