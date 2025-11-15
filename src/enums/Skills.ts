import z from 'zod'

export const DevelopSkillsEnum = z.enum([
  'Divination',
  'Electrokinesis',
  'Elemental Manipulation',
  'Healing Others',
  'Invisibility',
  'Scream Control',
  'Sense of Death',
  'Shapeshifting',
  'Sorcery',
  'Telekinesis',
  'Teleportation',
])

export const FixedSkillsEnum = z.enum([
  'Enhanced Sensations',
  'Healing Saliva',
  'Longevity',
  'Pain Absorption',
  'Paralyzing Venom',
  'Premonition',
  'Regeneration',
])