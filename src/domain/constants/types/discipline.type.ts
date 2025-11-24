export const DISCIPLINE_TYPE = {
  mandatory: 'mandatory',
  optional: 'optional',
} as const

// Tipo derivado
export type DisciplineType = (typeof DISCIPLINE_TYPE)[keyof typeof DISCIPLINE_TYPE]
