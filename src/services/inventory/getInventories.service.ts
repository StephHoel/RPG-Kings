import { getInventoriesBySaveId } from '@/infra/repositories'
import { InventoryModel } from '@/domain/models'
import { log } from '@/services'

export async function getInventoriesService(saveId: string): Promise<InventoryModel[]> {
  const inventories = await getInventoriesBySaveId(saveId)

  await log.info(`[${getInventoriesService.name}] Inventário obtido`, {
    saveId,
    amountItems: inventories.length,
  })

  return inventories
}
