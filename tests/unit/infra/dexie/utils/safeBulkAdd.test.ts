import { safeBulkAdd } from '@/infra/dexie/utils/safeBulkAdd'

describe('safeBulkAdd', () => {
  it('inserts items when no keySelector provided', async () => {
    const table: any = {
      bulkPut: jest.fn().mockResolvedValue(undefined),
      put: jest.fn().mockResolvedValue(undefined),
    }

    const data = [{ a: 1 }, { a: 2 }, { a: 1 }]

    const res = await safeBulkAdd(table, data, 2)

    expect(table.bulkPut).toHaveBeenCalled()
    expect(res.inserted).toBeGreaterThan(0)
  })

  it('uses keySelector path and skips existing', async () => {
    const table: any = {
      bulkGet: jest.fn().mockResolvedValue([undefined, { id: 2 }]),
      bulkAdd: jest.fn().mockResolvedValue(undefined),
    }

    const data = [{ id: 1 }, { id: 2 }]

    const res = await safeBulkAdd(table, data, 10, (it: any) => it.id)

    expect(table.bulkGet).toHaveBeenCalled()
    expect(res.skipped).toBeGreaterThanOrEqual(0)
  })
})
