import { createOrUpdateSheet, getAnimalsByRace, getSheetBySaveId } from '@/infra/repositories'
import { SheetModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES, RACE_ENUM } from '@/domain/constants'
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
      await log.warn(LOG_MESSAGES.animal.unavaiable({ method: createSheetService.name, race }), {
        race,
      })
    }
  } else if (race === RACE_ENUM.kitsune) {
    animal = animals && animals.length > 0 ? animals[0] : undefined
  }

  await createOrUpdateSheet({
    saveId,
    name,
    race,
    animal,
    coins: 0,
  } as SheetModel)

  const sheetCreated = await getSheetBySaveId(saveId)

  await log.info(LOG_MESSAGES.sheet.created({ method: createSheetService.name }), {
    sheet: sheetCreated,
  })

  return sheetCreated
}
