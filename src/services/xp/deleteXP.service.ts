import { deleteXPBySaveId } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteXPService(saveId: string): Promise<void> {
  await deleteXPBySaveId(saveId)

  await log.info(`[${deleteXPService.name}] XP deletado para ${saveId}`)
}
