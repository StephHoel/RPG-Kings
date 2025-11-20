import { Animals, Kitsune, Races, Stats } from '@/interfaces'
import { base } from './baseStats'
import { RacesEnum } from '@/enums'
import { getAnimalStats } from './animals'

const RACE_STATS: Record<Races, Stats> = {
  ARCANO: base({
    agility: 1,
    charisma: 0,
    intelligence: 3,
    stamina: 0,
    strength: 0
  }),
  BANSHEE: base({
    agility: 1,
    charisma: 3,
    intelligence: 1,
    stamina: 0,
    strength: 0
  }),
  KANIMA: base({
    agility: 3,
    charisma: 0,
    intelligence: 1,
    stamina: 2,
    strength: 2
  }),
  KITSUNE: base({
    agility: 2,
    charisma: 2,
    intelligence: 2,
    stamina: 1,
    strength: 1
  }),
  LOBISOMEM: base({
    agility: 2,
    charisma: 1,
    intelligence: 0,
    stamina: 3,
    strength: 3
  }),
  TRANSMORFO: base(),
  VAMPIRO: base({
    agility: 2,
    charisma: 2,
    intelligence: 1,
    stamina: 2,
    strength: 2
  }),
  WICCANIANO: base({
    agility: 0,
    charisma: 1,
    intelligence: 3,
    stamina: 1,
    strength: 0
  })
}

export function statsByRace(race: Races, animal: Animals | Kitsune | null = null): Stats | null {
  if (race === RacesEnum.enum.TRANSMORFO) {
    if (animal === null) {
      return null
    }

    return getAnimalStats(animal)
  }

  return RACE_STATS[race]
}