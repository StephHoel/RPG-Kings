export const XP_TYPE = {
  class: 'class',
  skill: 'skill',
} as const

// Tipo derivado
export type XPType = (typeof XP_TYPE)[keyof typeof XP_TYPE]
