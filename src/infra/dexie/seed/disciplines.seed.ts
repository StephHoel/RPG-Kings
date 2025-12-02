import { DISCIPLINE_ENUM, DISCIPLINE_TYPE, STAT_ENUM } from '@/domain/constants'
import { Discipline } from '@/infra/schemas'

export const disciplinesSeed: Discipline[] = [
  {
    // Idiomas -> Inteligência (Sabedoria mapeada para Inteligência)
    name: DISCIPLINE_ENUM.english,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Idiomas -> Inteligência
    name: DISCIPLINE_ENUM.german,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Idiomas -> Inteligência
    name: DISCIPLINE_ENUM.italian,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Idiomas -> Inteligência
    name: DISCIPLINE_ENUM.french,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Educação Física -> Força, Resistência, Destreza
    name: DISCIPLINE_ENUM.physical_education,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.strength, STAT_ENUM.stamina, STAT_ENUM.agility],
  },
  {
    // Negócios -> Inteligência (e habilidades sociais não mapeadas)
    name: DISCIPLINE_ENUM.economy,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Negócios -> Inteligência (e habilidades sociais não mapeadas)
    name: DISCIPLINE_ENUM.entrepreneurship,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Matemática -> Sabedoria (mapeada para Inteligência)
    name: DISCIPLINE_ENUM.math,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Sociologia -> Carisma, Sabedoria, Inteligência (Sabedoria -> Inteligência)
    name: DISCIPLINE_ENUM.sociology,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.charisma, STAT_ENUM.intelligence],
  },
  {
    // Filosofia -> Carisma, Sabedoria, Inteligência (Sabedoria -> Inteligência)
    name: DISCIPLINE_ENUM.philosophy,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.charisma, STAT_ENUM.intelligence],
  },
  {
    // Biologia -> Inteligência, Sabedoria, Resistência (Sabedoria -> Inteligência)
    name: DISCIPLINE_ENUM.biology,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence, STAT_ENUM.stamina],
  },
  {
    // Física -> Inteligência, Sabedoria, Resistência (Sabedoria -> Inteligência)
    name: DISCIPLINE_ENUM.physics,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence, STAT_ENUM.stamina],
  },
  {
    // Química -> Inteligência, Sabedoria, Resistência (Sabedoria -> Inteligência)
    name: DISCIPLINE_ENUM.chemistry,
    type: DISCIPLINE_TYPE.mandatory,
    stats: [STAT_ENUM.intelligence, STAT_ENUM.stamina],
  },
  // --- Optional disciplines from the book ---
  {
    // Danças -> Carisma, Destreza e Força
    name: DISCIPLINE_ENUM.ballet,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.charisma, STAT_ENUM.agility, STAT_ENUM.strength],
  },
  {
    // Jazz (dança/música) -> Carisma, Destreza e Força
    name: DISCIPLINE_ENUM.jazz,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.charisma, STAT_ENUM.agility, STAT_ENUM.strength],
  },
  {
    // Instrumentos Musicais -> Destreza e Resistência
    name: DISCIPLINE_ENUM.singing,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.choir,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.flute,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.piano,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.guitar,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.violin,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.cello,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    // Instrumento: Clarinete -> Destreza e Resistência
    name: DISCIPLINE_ENUM.clarinet,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    // Esportes de Quadra -> Destreza e Resistência
    name: DISCIPLINE_ENUM.basketball,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.volleyball,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    // Esportes de Grama -> Força e Resistência
    name: DISCIPLINE_ENUM.soccer,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.strength, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.rugby,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.strength, STAT_ENUM.stamina],
  },
  {
    // Esportes Aquáticos -> Resistência
    name: DISCIPLINE_ENUM.swimming,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.water_polo,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.stamina],
  },
  {
    // Lutas -> Força e Resistência
    name: DISCIPLINE_ENUM.olympic_wrestling,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.strength, STAT_ENUM.stamina],
  },
  {
    // Lutas: Tae Kwon Do -> Destreza, Força e Resistência
    name: DISCIPLINE_ENUM.tae_kwon_do,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.strength, STAT_ENUM.stamina],
  },
  {
    // Atletismo -> Destreza
    name: DISCIPLINE_ENUM.athletics,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility],
  },
  {
    // Hóquei no Gelo / Patinação Artística no Gelo -> Destreza e Resistência
    name: DISCIPLINE_ENUM.ice_hockey,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    name: DISCIPLINE_ENUM.figure_skating,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.agility, STAT_ENUM.stamina],
  },
  {
    // Outras Atividades -> Inteligência
    name: DISCIPLINE_ENUM.performing_arts,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.publishing,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.sculpture,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.filming,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.journalism,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.audiovisual_editing,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.painting,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    name: DISCIPLINE_ENUM.robotics,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
  {
    // Estilista de Moda -> Inteligência
    name: DISCIPLINE_ENUM.fashion_designer,
    type: DISCIPLINE_TYPE.optional,
    stats: [STAT_ENUM.intelligence],
  },
]
