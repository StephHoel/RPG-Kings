import { DISCIPLINE_ENUM, DISCIPLINE_TYPE, SKILLS_ENUM, STATS_ENUM } from '@/domain/constants'
import { Discipline } from '@/infra/schemas'

export const disciplinesSeed: Discipline[] = [
  {
    // TODO não real / consertar
    name: DISCIPLINE_ENUM.english,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [SKILLS_ENUM.longevity],
    stats: [STATS_ENUM.stamina],
  },
]
