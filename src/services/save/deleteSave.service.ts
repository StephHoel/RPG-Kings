import { deleteSave } from '@/infra/repositories'
import { log } from '@/services/lib'

export async function deleteSaveService(id: string): Promise<void> {
  await deleteSave(id)

  await log.info(`[${deleteSaveService.name}] Save deletado`, { id })
}
