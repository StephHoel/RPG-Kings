import {
  createOrUpdateXP,
  getDisciplineByName,
  getXPBySaveIdAndDiscipline,
} from '@/infra/repositories'
import { log } from '@/services'
import { XPRecordModel } from '@/domain/models'
import { LOG_MESSAGES } from '@/domain/constants'

export async function addXPService(
  saveId: XPRecordModel['saveId'],
  discipline: XPRecordModel['target'],
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
    } as XPRecordModel
  } else {
    record.xp += amountToAdd
  }

  await createOrUpdateXP(record)

  await log.info(LOG_MESSAGES.xp.added({ method: addXPService.name }), {
    saveId,
    discipline,
    xpAdded: amountToAdd,
    totalXp: record.xp,
  })
}
