import { ANIMALS_ENUM, RACES_ENUM } from '@/domain/constants'
import { Animal } from '@/infra/schemas'

export const animalsSeed: Animal[] = [
  {
    name: ANIMALS_ENUM.wolf,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.bear,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.lion,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.tiger,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.eagle,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.hawk,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.owl,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.snake,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.horse,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.fox,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.dog,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.cat,
    race: RACES_ENUM.werewolf,
  },
  {
    name: ANIMALS_ENUM.kitsune,
    race: RACES_ENUM.kitsune,
  },
]
