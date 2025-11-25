import { getSheetBySaveId } from '@/infra/repositories'
import { Sheet } from '@/infra/schemas'
import { log } from '../lib'

export async function getSheetService(saveId: string): Promise<Sheet | undefined> {
  const sheet = await getSheetBySaveId(saveId)

  await log.info(`[${getSheetService.name}] Ficha obtida`, { saveId, present: !!sheet })

  return sheet
}
