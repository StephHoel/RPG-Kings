export const SKILLS_ENUM = {
  longevity: 'Longevidade',
  // TODO adicionar skills aqui
} as const

// Tipo derivado
export type SKillsEnum = (typeof SKILLS_ENUM)[keyof typeof SKILLS_ENUM]
