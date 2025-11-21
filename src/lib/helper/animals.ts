import { Animals, Kitsune, Races, Stats } from '@/interfaces'
import { base } from './baseStats'
import { AnimalsEnum, KitsuneEnum, RacesEnum } from '@/enums'

/** `stats` base por animal/transformo */
const STATS_BY_ANIMAL: Record<Animals, Stats> = {
  Lobo: base({
    agility: 3,
    charisma: 1,
    intelligence: 2,
    stamina: 3,
    strength: 2,
  }),
  Urso: base({
    agility: 1,
    charisma: 1,
    intelligence: 2,
    stamina: 3,
    strength: 3,
  }),
  Leão: base({
    agility: 2,
    charisma: 2,
    intelligence: 2,
    stamina: 2,
    strength: 3,
  }),
  Tigre: base({
    agility: 3,
    charisma: 1,
    intelligence: 2,
    stamina: 2,
    strength: 3,
  }),
  Águia: base({
    agility: 3,
    charisma: 2,
    intelligence: 2,
    stamina: 2,
    strength: 1,
  }),
  Falcão: base({
    agility: 3,
    charisma: 1,
    intelligence: 2,
    stamina: 2,
    strength: 1,
  }),
  Coruja: base({
    agility: 2,
    charisma: 2,
    intelligence: 2,
    stamina: 2,
    strength: 1,
  }),
  Cobra: base({
    agility: 2,
    charisma: 1,
    intelligence: 1,
    stamina: 3,
    strength: 1,
  }),
  Cavalo: base({
    agility: 2,
    charisma: 2,
    intelligence: 1,
    stamina: 3,
    strength: 3,
  }),
  Raposa: base({
    agility: 3,
    charisma: 2,
    intelligence: 3,
    stamina: 2,
    strength: 1,
  }),
  Cachorro: base({
    agility: 2,
    charisma: 3,
    intelligence: 2,
    stamina: 3,
    strength: 1,
  }),
  Gato: base({
    agility: 3,
    charisma: 2,
    intelligence: 2,
    stamina: 2,
    strength: 1,
  }),
}

/** Retorna o `stats` pelo animal informado */
export function getAnimalStats(animal: Animals | Kitsune): Stats | null {
  return STATS_BY_ANIMAL[animal as Animals] ?? null
}

/** Retorna o `stats` para um animal aleatório */
export function randomAnimalStats(): Stats {
  const keys = Object.keys(AnimalsEnum) as Animals[]

  const pick = keys[Math.floor(Math.random() * keys.length)]

  return getAnimalStats(pick) as Stats
}

/** Retorna um animal aleatório com seu stats */
export function randomAnimal(): Animals {
  const keys = Object.keys(AnimalsEnum) as Animals[]

  const animalIndex = Math.floor(Math.random() * keys.length)

  const animal = keys[animalIndex]

  return animal
}

export function getAnimal(race: Races): Animals | Kitsune | null {
  if (race === RacesEnum.enum.TRANSMORFO) {
    return randomAnimal()
  }

  if (race === RacesEnum.enum.KITSUNE) {
    return KitsuneEnum.enum.Kitsune
  }

  return null
}
