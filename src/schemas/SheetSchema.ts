import z from 'zod'
import { s } from '@/utils'
import { AnimalsEnum, DevelopSkillsEnum, FixedSkillsEnum, KitsuneEnum, RacesEnum } from '@/enums'

export const SheetSchema = z.object({
  saveId: s.saveId,

  race: RacesEnum,
  animal: z.union([AnimalsEnum, KitsuneEnum]).nullable(),

  stats: z
    .object({
      strength: s.stats,
      agility: s.stats,
      intelligence: s.stats,
      charisma: s.stats,
      stamina: s.stats,

      hungry: s.stats,
      mood: s.stats,
      health: s.stats,

      magic: s.stats,
      mana: s.stats,
    })
    .optional(),

  developSkills: z.array(z.record(DevelopSkillsEnum, s.stats)).nullable().default([]).optional(),

  fixedSkills: z.array(FixedSkillsEnum),

  // dinheiro do jogo
  coins: z.number().int().nonnegative(),

  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
})
