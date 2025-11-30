import { deleteSaveCascade } from '@/infra/repositories'
import { log } from '@/services'

export async function deleteSaveService(id: string): Promise<void> {
  await deleteSaveCascade(id)

  await log.info(`[${deleteSaveService.name}] Save deletado`, undefined, { id })
}
