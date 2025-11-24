export const RACES_ENUM = {
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
export type RaceEnum = (typeof RACES_ENUM)[keyof typeof RACES_ENUM]
