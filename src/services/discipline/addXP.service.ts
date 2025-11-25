import {
  createOrUpdateXP,
  getDisciplineByName,
  getXPBySaveIdAndDiscipline,
} from '@/infra/repositories'
import { log } from '@/services'
import { XPRecord } from '@/infra/schemas'

export async function addXPService(
  saveId: XPRecord['saveId'],
  discipline: XPRecord['target'],
  amountToAdd: number
) {
  const disciplineData = await getDisciplineByName(discipline)
  let record = await getXPBySaveIdAndDiscipline(saveId, discipline)

  if (record === undefined) {
    record = {
      saveId,
      target: discipline,
      type: disciplineData?.type,
      xp: amountToAdd,
    } as XPRecord
  } else {
    record.xp += amountToAdd
  }

  await createOrUpdateXP(record)

  await log.info(`[${addXPService.name}] XP adicionado`, {
    saveId,
    discipline,
    xpAdded: amountToAdd,
    totalXp: record.xp,
  })
}
