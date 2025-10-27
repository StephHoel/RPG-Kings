import z from 'zod'
import { s } from './_schemas'

export const SheetSchema = z.object({
  id: s.saveId,

  // TODO talvez atributos seja uma lista específica. ex.: for, agi, int...
  // TODO talvez fazer um enum para esses atributos
  attrs: z.record(z.string(), z.number()),

  // TODO fazer uma lista perícias, mas aqui vai ser incluída apenas as que o personagem tiver com base na raça
  // TODO [PENSAR] talvez fazer um enum para essas perícias? Mas como fazer se cada raça tem perícias específicas? Qual melhor caminho: enum ou tabela domínio com informações adicionais?
  skills: z.record(z.string(), z.number()),

  // aqui será armazenado a reputação com personagens NPC
  reputation: z.record(z.string(), z.number()).optional(),

  // dinheiro do jogo
  coins: z.number().int().nonnegative(),

  // TODO ainda não sei o que fazer com essas tags
  tags: z.array(z.string()),

  updatedAt: s.updatedAt,
  createdAt: s.createdAt,
})