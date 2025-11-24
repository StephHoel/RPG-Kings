import { DISCIPLINE_ENUM, DISCIPLINE_TYPE, SKILL_ENUM, STAT_ENUM } from '@/domain/constants'
import { Discipline } from '@/infra/schemas'

export const disciplinesSeed: Discipline[] = [
  {
    // TODO FIX skills e stats
    name: DISCIPLINE_ENUM.english,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [SKILL_ENUM.longevity],
    stats: [STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.german,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.italian,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.romansh,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.french,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.physical_education,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.business,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.math,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.sociology,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.philosophy,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.biology,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.physics,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
  {
    name: DISCIPLINE_ENUM.chemistry,
    type: DISCIPLINE_TYPE.mandatory,
    skills: [],
    stats: [],
  },
]
