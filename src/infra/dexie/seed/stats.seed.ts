import { Stats } from '@/infra/schemas'

export const statsSeed: Stats[] = [
  {
    saveId: 'save_1',
    strength: 7,
    agility: 6,
    intelligence: 4,
    charisma: 3,
    stamina: 7,
    hungry: {
      current: 50,
      max: 100,
    },
    mood: {
      current: 50,
      max: 100,
    },
    health: {
      current: 100,
      max: 100,
    },
    magic: {
      current: 10,
      max: 100,
    },
    mana: {
      current: 10,
      max: 100,
    },
  },
]
