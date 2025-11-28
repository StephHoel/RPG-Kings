import { deleteSheetsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteSheetService(saveId: string): Promise<void> {
  await deleteSheetsBySaveId(saveId)

  await log.info(`[${deleteSheetService.name}] Ficha deletada para ${saveId}`)
}
