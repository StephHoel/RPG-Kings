import { createOrUpdateSheet, getAnimalsByRace, getSheetBySaveId } from '@/infra/repositories'
import { SheetModel } from '@/domain/models'
import { log } from '@/services'
import { RACE_ENUM } from '@/domain/constants'
import { CreateSheet } from '@/domain/types'
import { selectRandom } from '@/domain/utils'

export async function createSheetService({
  saveId,
  name,
  race,
}: CreateSheet): Promise<SheetModel | undefined> {
  const animals = await getAnimalsByRace(race)
  let animal = undefined

  if (race === RACE_ENUM.shapeshift) {
    animal = selectRandom(animals)

    if (!animal) {
      await log.warn(
        `[${createSheetService.name}] Nenhum animal disponível para ${RACE_ENUM.shapeshift}`, undefined,
        { race }
      )
    }
  } else if (race === RACE_ENUM.kitsune) {
    animal = animals && animals.length > 0 ? animals[0] : undefined
  }

  const sheet = {
    saveId,
    name,
    race,
    animal,
    coins: 0,
  } as SheetModel

  await createOrUpdateSheet(sheet)

  const sheetCreated = await getSheetBySaveId(saveId)

  await log.info(`[${createSheetService.name}] Ficha criada com sucesso`, undefined, { sheet: sheetCreated })

  return sheetCreated
}
