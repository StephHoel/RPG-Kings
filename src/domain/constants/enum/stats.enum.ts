export const STATS_ENUM = {
  stamina: 'Estamina',
  // TODO adicionar stats aqui
} as const

// Tipo derivado
export type StatsEnum = (typeof STATS_ENUM)[keyof typeof STATS_ENUM]
