import z from 'zod'

export const MandatoryClassesEnum = z.enum({
  IDIOMAS: 'Idiomas', // TODO colocar cada idioma
  EDUCACAO_FISICA: 'Educação Física',
  NEGOCIOS: 'Negócios',
  MATEMATICA: 'Matemática',
  SOCIOLOGIA: 'Sociologia',
  FILOSOFIA: 'Filosofia',
  BIOLOGIA: 'Biologia',
  FISICA: 'Física',
  QUIMICA: 'Química',
})

export const OptionalClassesEnum = z.enum({
  ESPORTES_DE_QUADRA: 'Esportes de Quadra', // TODO colocar cada esporte
  ESPORTES_DE_GRAMA: 'Esportes de Grama', // TODO colocar cada esporte
  ESPORTES_AQUATICOS: 'Esportes Aquáticos', // TODO colocar cada esporte
  INSTRUMENTOS_MUSICAIS: 'Instrumentos Musicais', // TODO colocar cada instrumento
  DANCAS: 'Danças', // TODO colocar cada dança
  LUTAS: 'Lutas', // TODO colocar cada luta
  ARTES_CENICAS: 'Artes Cênicas',
  PATINACAO_ARTISTICA_NO_GELO: 'Patinação Artística no Gelo',
  HOQUEI_NO_GELO: 'Hóquei no Gelo',
  ATLETISMO: 'Atletismo',
})
