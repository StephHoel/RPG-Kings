export const SKILL_ENUM = {
  divination: 'Adivinhação',
  electrokinesis: 'Eletrocinese',
  elemental_manipulation: 'Manipulação Elemental',
  healing_others: 'Poder de Cura',
  invisibility: 'Invisibilidade',
  scream_control: 'Controle do Grito',
  sense_of_death: 'Sentido de Morte',
  shapeshifting: 'Mudar Forma',
  sorcery: 'Feitiçaria',
  telekinesis: 'Telecinese',
  teleportation: 'Teletransporte',

  enhanced_sensations: 'Sentidos Aguçados',
  healing_saliva: 'Saliva Cicatrizante',
  longevity: 'Longevidade',
  pain_absorption: 'Absorção de Dor',
  paralyzing_venom: 'Veneno Paralizante',
  premonition: 'Premonição',
  regeneration: 'Regeneração',
} as const

// Tipo derivado
export type SKillEnum = (typeof SKILL_ENUM)[keyof typeof SKILL_ENUM]
