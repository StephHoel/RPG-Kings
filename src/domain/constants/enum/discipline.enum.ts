export const DISCIPLINE_ENUM = {
  english: 'Inglês',
  german: 'Alemão',
  italian: 'Italiano',
  romansh: 'Romanche',
  french: 'Francês',
  physical_education: 'Educação Física',
  business: 'Negócios',
  math: 'Matemática',
  sociology: 'Sociologia',
  philosophy: 'Filosofia',
  biology: 'Biologia',
  physics: 'Física',
  chemistry: 'Química',

  // TODO adicionar disciplinas aqui
  ESPORTES_DE_QUADRA: 'Esportes de Quadra', // TODO colocar cada esporte
  ESPORTES_DE_GRAMA: 'Esportes de Grama', // TODO colocar cada esporte
  ESPORTES_AQUATICOS: 'Esportes Aquáticos', // TODO colocar cada esporte
  INSTRUMENTOS_MUSICAIS: 'Instrumentos Musicais', // TODO colocar cada instrumento
  DANCAS: 'Danças', // TODO colocar cada dança
  LUTAS: 'Lutas', // TODO colocar cada luta
  performing: 'Artes Cênicas',
  figure_skating: 'Patinação Artística no Gelo',
  ice_hockey: 'Hóquei no Gelo',
  athletics: 'Atletismo',
} as const

// Tipo derivado
export type DisciplineEnum = (typeof DISCIPLINE_ENUM)[keyof typeof DISCIPLINE_ENUM]
