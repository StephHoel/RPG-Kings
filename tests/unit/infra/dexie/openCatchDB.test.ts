import Dexie from 'dexie'
import { openCatchDB } from '@/infra/dexie/utils'

describe('openCatchDB', () => {
  test('deletes and reopens DB on version error', async () => {
    const fakeDb: any = {
      name: 'fake-db-' + Date.now(),
      open: jest.fn().mockResolvedValue(undefined),
    }

    const deleteSpy = jest.spyOn(Dexie, 'delete').mockResolvedValue(undefined as any)

    const err = { name: 'VersionError' }

    await openCatchDB(fakeDb as any, err)

    expect(deleteSpy).toHaveBeenCalledWith(fakeDb.name)
    expect(fakeDb.open).toHaveBeenCalled()

    deleteSpy.mockRestore()
  })

  test('throws non-version errors', async () => {
    const fakeDb: any = {
      name: 'fake-db-' + Date.now(),
      open: jest.fn(),
    }

    const err = { name: 'SomeOtherError' }

    await expect(openCatchDB(fakeDb as any, err)).rejects.toEqual(err)
  })
})
