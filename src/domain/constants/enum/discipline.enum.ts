export const DISCIPLINE_ENUM = {
  english: 'Inglês',
  // TODO adicionar disciplinas aqui
} as const

// Tipo derivado
export type DisciplineEnum = (typeof DISCIPLINE_ENUM)[keyof typeof DISCIPLINE_ENUM]
