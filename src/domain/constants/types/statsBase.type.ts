export const STAT_TYPE = {
  animal: 'animal',
  race: 'race',
} as const

// Tipo derivado
export type StatType = (typeof STAT_TYPE)[keyof typeof STAT_TYPE]
