import z from 'zod'

export function buildEnumRecord<T extends Record<string, string>>(obj: T) {
  return z.enum(Object.values(obj) as [string, ...string[]])
}

export function buildEnumArray<T extends string[]>(values: [...T]) {
  return z.enum(values)
}
