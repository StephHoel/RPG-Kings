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
  athletics: 'Atletismo',
  // Danças
  ballet: 'Balé',
  hip_hop: 'Hip-Hop',
  kizomba: 'Kizomba',
  kuduro: 'Kuduro',

  // Esportes Aquáticos
  swimming: 'Natação',
  water_polo: 'Polo Aquático',

  // Esportes de Grama
  soccer: 'Futebol',
  field_hockey: 'Hóquei de Grama',
  rugby: 'Rúgbi',

  // Esportes de Quadra
  basketball: 'Basquete',
  handball: 'Handebol',
  volleyball: 'Vôlei',

  // Esportes diversos / Gelo
  ice_hockey: 'Hóquei no Gelo',
  figure_skating: 'Patinação Artística no Gelo',

  // Lutas
  capoeira: 'Capoeira',
  fencing: 'Esgrima',
  olympic_wrestling: 'Luta Livre Olímpica',

  // Música
  atabaque: 'Atabaque',
  singing: 'Canto',
  choir: 'Coral',
  flute: 'Flauta Transversa',
  piano: 'Piano',
  guitar: 'Violão/Guitarra',
  violin: 'Violino',
  cello: 'Violoncelo',

  // Outras atividades
  performing: 'Artes Cênicas',
  publishing: 'Editoração',
  sculpture: 'Escultura',
  filming: 'Filmagem',
  journalism: 'Jornalismo',
  audiovisual_editing: 'Montagem Audiovisual',
  painting: 'Pintura',
  game_production: 'Produção de Jogos',
  programming: 'Programação',
  robotics: 'Robótica',
} as const

// Tipo derivado
export type DisciplineEnum = (typeof DISCIPLINE_ENUM)[keyof typeof DISCIPLINE_ENUM]
