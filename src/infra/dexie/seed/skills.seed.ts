import { RACE_ENUM, SKILL_ENUM, SKILL_TYPE } from '@/domain/constants'
import { Skill } from '@/infra/schemas'

export const skillsSeed: Skill[] = [
  {
    name: SKILL_ENUM.divination,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.banshee],
  },
  {
    name: SKILL_ENUM.electrokinesis,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.wiccan],
  },
  {
    name: SKILL_ENUM.elemental_manipulation,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.arcane, RACE_ENUM.kitsune],
  },
  {
    name: SKILL_ENUM.healing_others,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.arcane, RACE_ENUM.vampire],
  },
  {
    name: SKILL_ENUM.invisibility,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.wiccan],
  },
  {
    name: SKILL_ENUM.scream_control,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.banshee],
  },
  {
    name: SKILL_ENUM.sense_of_death,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.banshee],
  },
  {
    name: SKILL_ENUM.shapeshifting,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.kitsune, RACE_ENUM.shapeshift],
  },
  {
    name: SKILL_ENUM.sorcery,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.arcane],
  },
  {
    name: SKILL_ENUM.telekinesis,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.wiccan],
  },
  {
    name: SKILL_ENUM.teleportation,
    type: SKILL_TYPE.develop,
    races: [RACE_ENUM.wiccan],
  },

  {
    name: SKILL_ENUM.enhanced_sensations,
    type: SKILL_TYPE.fixed,
    races: [RACE_ENUM.kanime, RACE_ENUM.werewolf, RACE_ENUM.shapeshift, RACE_ENUM.vampire],
  },
  {
    name: SKILL_ENUM.healing_saliva,
    type: SKILL_TYPE.fixed,
    races: [],
  },
  {
    name: SKILL_ENUM.longevity,
    type: SKILL_TYPE.fixed,
    races: [
      RACE_ENUM.arcane,
      RACE_ENUM.kanime,
      RACE_ENUM.kitsune,
      RACE_ENUM.werewolf,
      RACE_ENUM.shapeshift,
      RACE_ENUM.vampire,
    ],
  },
  {
    name: SKILL_ENUM.pain_absorption,
    type: SKILL_TYPE.fixed,
    races: [RACE_ENUM.werewolf],
  },
  {
    name: SKILL_ENUM.paralyzing_venom,
    type: SKILL_TYPE.fixed,
    races: [RACE_ENUM.kanime],
  },
  {
    name: SKILL_ENUM.premonition,
    type: SKILL_TYPE.fixed,
    races: [RACE_ENUM.banshee],
  },
  {
    name: SKILL_ENUM.regeneration,
    type: SKILL_TYPE.fixed,
    races: [
      RACE_ENUM.kanime,
      RACE_ENUM.kitsune,
      RACE_ENUM.werewolf,
      RACE_ENUM.shapeshift,
      RACE_ENUM.vampire,
    ],
  },
]
