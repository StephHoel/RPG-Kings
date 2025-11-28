import { getSheetBySaveId } from '@/infra/repositories'
import { SheetModel } from '@/domain/models'
import { log } from '@/services'

export async function getSheetService(saveId: string): Promise<SheetModel | undefined> {
  const sheet = await getSheetBySaveId(saveId)

  await log.info(`[${getSheetService.name}] Ficha obtida`, { saveId, present: !!sheet })

  return sheet
}
