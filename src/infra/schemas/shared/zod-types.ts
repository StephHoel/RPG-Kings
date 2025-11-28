import { z } from 'zod'

// IDs
export const idString = z.string().min(1, 'ID não pode ser vazio')
export const numericId = z.number().int().nonnegative()

// Datas
export const isoDate = z
  .union([
    z.date(),
    z
      .string()
      .refine((s) => !isNaN(new Date(s).getTime()), 'Data inválida')
      .transform((s) => new Date(s)),
  ])
  .optional()
  .transform((v) => v ?? new Date())
export const isoDateOptional = isoDate.optional()

// Strings comuns
export const nonEmptyString = z.string().min(1)
export const optionalString = z.string().optional().nullable()

// Números
export const positiveInt = z.number().int().positive()
export const nonNegativeInt = z.number().int().nonnegative()

// Arrays
export const stringArray = z.array(z.string())
export const numberArray = z.array(z.number())

export const resourceSchema = z.object({ current: z.number(), max: z.number() })
