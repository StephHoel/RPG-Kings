import { XPRecordModel } from '@/domain/models'
import { getXPsBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function getXPsService(saveId: string): Promise<XPRecordModel[] | undefined> {
  const xp = await getXPsBySaveId(saveId)

  await log.info(`[${getXPsService.name}] XPs obtido para ${saveId}`)

  return xp
}
