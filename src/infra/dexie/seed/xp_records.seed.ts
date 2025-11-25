import { DISCIPLINE_ENUM, SKILL_ENUM, XP_TYPE } from '@/domain/constants'
import { XPRecord } from '@/infra/schemas'

export const xpRecordsSeed: XPRecord[] = [
  {
    saveId: 'save_1',
    type: XP_TYPE.class,
    target: DISCIPLINE_ENUM.athletics,
    xp: 10,
  },
  {
    saveId: 'save_1',
    type: XP_TYPE.skill,
    target: SKILL_ENUM.divination,
    xp: 5,
  },
]
