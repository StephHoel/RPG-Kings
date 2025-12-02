import { DISCIPLINE_ENUM } from './discipline.enum'
import { SKILL_ENUM } from './skills.enum'

export const XP_ENUM = {
  ...SKILL_ENUM,
  ...DISCIPLINE_ENUM,
} as const

// Tipo derivado
export type XPEnum = (typeof XP_ENUM)[keyof typeof XP_ENUM]
