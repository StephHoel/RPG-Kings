import { getSheetBySaveId } from '@/infra/repositories'
import { SheetModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function getSheetService(saveId: string): Promise<SheetModel | undefined> {
  const sheet = await getSheetBySaveId(saveId)

  await log.info(LOG_MESSAGES.sheet.obtained({ method: getSheetService.name }), {
    saveId,
    present: !!sheet,
  })

  return sheet
}
