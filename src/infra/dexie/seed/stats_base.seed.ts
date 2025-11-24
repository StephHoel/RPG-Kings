import { StatsBase } from '@/infra/schemas'

export const statsBaseSeed: StatsBase[] = [
  // Base de raças
  {
    id: 1,
    type: 'race',
    target: 'Human',
    strength: 5,
    agility: 5,
    intelligence: 5,
    charisma: 5,
    stamina: 5,
  },
  {
    id: 2,
    type: 'race',
    target: 'Beastborn',
    strength: 7,
    agility: 6,
    intelligence: 4,
    charisma: 3,
    stamina: 7,
  },
  {
    id: 3,
    type: 'race',
    target: 'Skyfolk',
    strength: 4,
    agility: 8,
    intelligence: 6,
    charisma: 6,
    stamina: 4,
  },

  // Base de animais
  {
    id: 4,
    type: 'animal',
    target: 'Wolf',
    strength: 6,
    agility: 7,
    intelligence: 2,
    charisma: 1,
    stamina: 8,
  },
  {
    id: 5,
    type: 'animal',
    target: 'Falcon',
    strength: 2,
    agility: 9,
    intelligence: 3,
    charisma: 1,
    stamina: 5,
  },
]
