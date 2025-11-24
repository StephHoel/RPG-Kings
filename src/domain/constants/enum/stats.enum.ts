export const STAT_ENUM = {
  strength: 'Força',
  agility: 'Agilidade',
  intelligence: 'Inteligência',
  charisma: 'Carisma',
  stamina: 'Vigor',
  hungry: 'Fome',
  mood: 'Humor',
  health: 'Saúde',
  magic: 'Magia',
  mana: 'Mana',
} as const

// Tipo derivado
export type StatEnum = (typeof STAT_ENUM)[keyof typeof STAT_ENUM]
