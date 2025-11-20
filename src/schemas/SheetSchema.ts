import z from 'zod'
import { s } from '@/utils'
import { AnimalsEnum, DevelopSkillsEnum, FixedSkillsEnum, KitsuneEnum, RacesEnum } from '@/enums'

export const SheetSchema = z.object({
  saveId: s.saveId,

  race: RacesEnum,
  animal: z.union([AnimalsEnum, KitsuneEnum]).nullable(),

  stats: z.object({
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
  }).optional(),

  developSkills: z.array(z.record(DevelopSkillsEnum, s.stats)),

  fixedSkills: z.array(FixedSkillsEnum),

  // TODO talvez mudar de string para enum/nome
  // aqui será armazenado a reputação com personagens NPC
  reputation: z.array(z.record(z.string(), z.number())).default([]).optional(),

  // dinheiro do jogo
  coins: z.number().int().nonnegative(),

  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
})