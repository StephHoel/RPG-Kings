import { Race } from '@/infra/schemas'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const racesSeed: Race[] = [
  {
    name: RACE_ENUM.arcane,
    hasAnimal: false,
  },
  {
    name: RACE_ENUM.banshee,
    hasAnimal: false,
  },
  {
    name: RACE_ENUM.kanime,
    hasAnimal: false,
  },
  {
    name: RACE_ENUM.kitsune,
    hasAnimal: true,
    defaultAnimal: ANIMAL_ENUM.kitsune,
  },
  {
    name: RACE_ENUM.werewolf,
    hasAnimal: false,
  },
  {
    name: RACE_ENUM.shapeshift,
    hasAnimal: true,
  },
  {
    name: RACE_ENUM.vampire,
    hasAnimal: false,
  },
  {
    name: RACE_ENUM.wiccan,
    hasAnimal: false,
  },
]
