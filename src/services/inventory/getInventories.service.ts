import { getInventoriesBySaveId } from '@/infra/repositories'
import { InventoryModel } from '@/domain/models'
import { log } from '@/services'

export async function getInventoriesService(saveId: string): Promise<InventoryModel[]> {
  const inventories = (await getInventoriesBySaveId(saveId)).sort((a, b) => {
    // 1) acquiredWeek desc (undefined treated as very small)
    const awA = typeof a.acquiredWeek === 'number' ? a.acquiredWeek : Number.NEGATIVE_INFINITY
    const awB = typeof b.acquiredWeek === 'number' ? b.acquiredWeek : Number.NEGATIVE_INFINITY
    if (awA !== awB) return awB - awA

    // 2) expiresAtWeek: undefined first, then ascending
    const eaA = a.expiresAtWeek
    const eaB = b.expiresAtWeek
    const eaUndefA = eaA === undefined
    const eaUndefB = eaB === undefined
    if (eaUndefA !== eaUndefB) return eaUndefA ? -1 : 1
    if (!eaUndefA && !eaUndefB && eaA !== eaB) return (eaA as number) - (eaB as number)

    // 3) usedAtWeek: undefined first, then ascending
    const uaA = a.usedAtWeek
    const uaB = b.usedAtWeek
    const uaUndefA = uaA === undefined
    const uaUndefB = uaB === undefined
    if (uaUndefA !== uaUndefB) return uaUndefA ? -1 : 1
    if (!uaUndefA && !uaUndefB && uaA !== uaB) return (uaA as number) - (uaB as number)

    return 0
  })

  await log.info(`[${getInventoriesService.name}] Inventário obtido`, {
    saveId,
    amountItems: inventories.length,
  })

  return inventories
}
