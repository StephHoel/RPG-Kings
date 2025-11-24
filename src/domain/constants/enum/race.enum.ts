export const RACE_ENUM = {
  arcane: 'Arcano',
  banshee: 'Banshee',
  kanime: 'Kanima',
  kitsune: 'Kitsune',
  werewolf: 'Lobisomem',
  shapeshift: 'Transmorfo',
  vampire: 'Vampiro',
  wiccan: 'Wiccaniano',
} as const

// Tipo derivado
export type RaceEnum = (typeof RACE_ENUM)[keyof typeof RACE_ENUM]
