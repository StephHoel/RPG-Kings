// import { DevelopSkill, FixedSkill, Races, Skills } from '@/types'
// import { DevelopSkillsEnum, FixedSkillsEnum } from '@/domain/constants/Skills'

// const RACE_SKILLS: Record<Races, Skills[]> = {
//   ARCANO: [
//     DevelopSkillsEnum.enum.SORCERY,
//     FixedSkillsEnum.enum.LONGEVITY,
//     DevelopSkillsEnum.enum.ELEMENTAL_MANIPULATION,
//     DevelopSkillsEnum.enum.HEALING_OTHERS,
//   ],
//   BANSHEE: [
//     DevelopSkillsEnum.enum.DIVINATION,
//     DevelopSkillsEnum.enum.SCREAM_CONTROL,
//     FixedSkillsEnum.enum.PREMONITION,
//     DevelopSkillsEnum.enum.SENSE_OF_DEATH,
//   ],
//   KANIMA: [
//     FixedSkillsEnum.enum.LONGEVITY,
//     FixedSkillsEnum.enum.REGENERATION,
//     FixedSkillsEnum.enum.ENHANCED_SENSATIONS,
//     FixedSkillsEnum.enum.PARALYZING_VENOM,
//   ],
//   KITSUNE: [
//     FixedSkillsEnum.enum.LONGEVITY,
//     DevelopSkillsEnum.enum.ELEMENTAL_MANIPULATION,
//     DevelopSkillsEnum.enum.SHAPESHIFTING,
//     FixedSkillsEnum.enum.REGENERATION,
//   ],
//   LOBISOMEM: [
//     FixedSkillsEnum.enum.PAIN_ABSORPTION,
//     FixedSkillsEnum.enum.LONGEVITY,
//     FixedSkillsEnum.enum.REGENERATION,
//     FixedSkillsEnum.enum.ENHANCED_SENSATIONS,
//   ],
//   TRANSMORFO: [
//     FixedSkillsEnum.enum.LONGEVITY,
//     DevelopSkillsEnum.enum.SHAPESHIFTING,
//     FixedSkillsEnum.enum.REGENERATION,
//     FixedSkillsEnum.enum.ENHANCED_SENSATIONS,
//   ],
//   VAMPIRO: [
//     FixedSkillsEnum.enum.LONGEVITY,
//     FixedSkillsEnum.enum.REGENERATION,
//     FixedSkillsEnum.enum.HEALING_SALIVA,
//     FixedSkillsEnum.enum.ENHANCED_SENSATIONS,
//   ],
//   WICCANIANO: [
//     DevelopSkillsEnum.enum.ELECTROKINESIS,
//     DevelopSkillsEnum.enum.INVISIBILITY,
//     DevelopSkillsEnum.enum.TELEKINESIS,
//     DevelopSkillsEnum.enum.TELEPORTATION,
//   ],
// }

// export function getSkills(race: Races): Skills[] {
//   return RACE_SKILLS[race]
// }

// const DEVELOP_VALUES = new Set<DevelopSkill>(
//   Object.values(DevelopSkillsEnum.enum) as DevelopSkill[]
// )

// export function getDevelopSkills(race: Races): Record<DevelopSkill, number>[] {
//   const skills = getSkills(race).filter((s): s is DevelopSkill =>
//     DEVELOP_VALUES.has(s as DevelopSkill)
//   )

//   return skills.map((skillName) => ({ [skillName]: 0 })) as Record<DevelopSkill, number>[]
// }

// const FIXED_VALUES = new Set<FixedSkill>(Object.values(FixedSkillsEnum.enum) as FixedSkill[])

// export function getFixedSkills(race: Races): FixedSkill[] {
//   return getSkills(race).filter((s): s is FixedSkill => FIXED_VALUES.has(s as FixedSkill))
// }
