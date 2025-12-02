import { LOG_MESSAGES } from '@/domain/constants'
import { deleteSheetsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteSheetService(saveId: string): Promise<void> {
  await deleteSheetsBySaveId(saveId)

  await log.info(LOG_MESSAGES.sheet.deleted({ method: deleteSheetService.name, saveId }))
}
