import { LOG_MESSAGES } from '@/domain/constants'
import { XPRecordModel } from '@/domain/models'
import { getXPsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function getXPsService(saveId: string): Promise<XPRecordModel[] | undefined> {
  const xp = await getXPsBySaveId(saveId)

  await log.info(LOG_MESSAGES.xp.get({ method: getXPsService.name, saveId }))

  return xp
}
