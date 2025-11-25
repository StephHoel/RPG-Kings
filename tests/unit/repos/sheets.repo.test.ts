import { RACE_ENUM } from '@/domain/constants'
import {
  getSheetBySaveId,
  createOrUpdateSheet,
  deleteSheet,
} from '@/infra/repositories/sheets.repo'
import { Sheet } from '@/infra/schemas'

describe('sheets.repo', () => {
  const sheet: Sheet = {
    saveId: 'save_test_1',
    name: 'Hero',
    race: RACE_ENUM.vampire,
    coins: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  test('create and read', async () => {
    await createOrUpdateSheet(sheet)

    const fetched = await getSheetBySaveId(sheet.saveId)
    sheet.id = fetched?.id

    expect(sheet.id).not.toBeUndefined()
  })

  test('update', async () => {
    await createOrUpdateSheet({ ...sheet, coins: 20 })

    const updated = await getSheetBySaveId(sheet.saveId)

    expect(updated?.coins).not.toBe(sheet.coins)
  })

  test('delete', async () => {
    await deleteSheet(sheet.id as number)

    const after = await getSheetBySaveId(sheet.saveId)
    expect(after).toBeUndefined()
  })
})
