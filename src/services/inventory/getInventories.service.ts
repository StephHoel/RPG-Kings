import { getInventoriesBySaveId } from '@/infra/repositories'
import { Inventory } from '@/infra/schemas'
import { log } from '../lib'

export async function getInventoriesService(saveId: string): Promise<Inventory[]> {
  const inventories = await getInventoriesBySaveId(saveId)

  await log.info(`[${getInventoriesService.name}] Inventário obtido`, {
    saveId,
    amountItems: inventories.length,
  })

  return inventories
}
