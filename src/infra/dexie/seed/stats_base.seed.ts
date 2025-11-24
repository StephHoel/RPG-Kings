import { ANIMAL_ENUM, RACE_ENUM, STAT_TYPE } from '@/domain/constants'
import { StatsBase } from '@/infra/schemas'

export const statsBaseSeed: StatsBase[] = [
  // Base de raças
  {
    // TODO consertar stats de vampiro e implementar outras raças
    type: STAT_TYPE.race,
    target: RACE_ENUM.vampire,
    strength: 7,
    agility: 6,
    intelligence: 4,
    charisma: 3,
    stamina: 7,
  },

  // Base de animais
  {
    // TODO consertar stats de lobo e implementar outros animais
    type: STAT_TYPE.animal,
    target: ANIMAL_ENUM.wolf,
    strength: 6,
    agility: 7,
    intelligence: 2,
    charisma: 1,
    stamina: 8,
  },
]
