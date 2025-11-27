// Mock the db module that the repo imports
const mockTable: any = {
  add: jest.fn().mockResolvedValue(1),
  put: jest.fn().mockResolvedValue(undefined),
  where: jest.fn().mockReturnThis(),
  first: jest.fn().mockResolvedValue(undefined),
  toArray: jest.fn().mockResolvedValue([]),
  bulkDelete: jest.fn().mockResolvedValue(undefined),
}

jest.mock('@/infra/dexie/database', () => ({ db: { sheets: mockTable } }))

import * as repo from '@/infra/repositories/sheets.repo'

describe('sheets.repo', () => {
  it('creates or updates sheet (add path)', async () => {
    await repo.createOrUpdateSheet({ saveId: 's', name: 'n' } as any)

    expect(mockTable.add).toHaveBeenCalled()
  })
})
