import z from 'zod'

export const DevelopSkillsEnum = z.enum({
  DIVINATION: 'Adivinhação',
  ELECTROKINESIS: 'Eletrocinese',
  ELEMENTAL_MANIPULATION: 'Manipulação Elemental',
  HEALING_OTHERS: 'Poder de Cura',
  INVISIBILITY: 'Invisibilidade',
  SCREAM_CONTROL: 'Controle do Grito',
  SENSE_OF_DEATH: 'Sentido de Morte',
  SHAPESHIFTING: 'Mudar Forma',
  SORCERY: 'Feitiçaria',
  TELEKINESIS: 'Telecinese',
  TELEPORTATION: 'Teletransporte',
})

export const FixedSkillsEnum = z.enum({
  ENHANCED_SENSATIONS: 'Sentidos Aguçados',
  HEALING_SALIVA: 'Saliva Cicatrizante',
  LONGEVITY: 'Longevidade',
  PAIN_ABSORPTION: 'Absorção de Dor',
  PARALYZING_VENOM: 'Veneno Paralizante',
  PREMONITION: 'Premonição',
  REGENERATION: 'Regeneração',
})