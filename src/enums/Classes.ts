import z from 'zod'

export const MandatoryClassesEnum = z.enum([
  'Idiomas', // TODO colocar cada idioma
  'Educação Física',
  'Negócios',
  'Matemática',
  'Sociologia',
  'Filosofia',
  'Biologia',
  'Física',
  'Química',
])

export const OptionalClassesEnum = z.enum([
  'Esportes de Quadra',  // TODO colocar cada esporte
  'Esportes de Grama', // TODO colocar cada esporte
  'Esportes Aquáticos', // TODO colocar cada esporte
  'Instrumentos Musicais', // TODO colocar cada instrumento
  'Danças', // TODO colocar cada dança
  'Lutas', // TODO colocar cada luta
  'Artes Cênicas',
  'Patinação Artística no Gelo',
  'Hóquei no Gelo',
  'Atletismo',
])
