import z from 'zod'

export const MandatoryClasses = z.enum([
  'Educação Física',
  'Idiomas', // TODO colocar cada idioma
  'Negócios',
  'Matemática',
  'Sociologia',
  'Filosofia',
  'Biologia',
  'Física',
  'Química',
])

export const OptionalClasses = z.enum([
  'Esportes de Quadra',  // TODO colocar cada esporte
  'Esportes de Grama', // TODO colocar cada esporte
  'Esportes Aquáticos', // TODO colocar cada esporte
  'Danças', // TODO colocar cada dança
  'Lutas', // TODO colocar cada luta
  'Artes Cênicas',
  'Instrumentos Musicais',
  'Patinação Artística no Gelo',
  'Hóquei no Gelo',
  'Atletismo',
])
