export const SKILL_TYPE = {
  develop: 'develop',
  fixed: 'fixed',
} as const

// Tipo derivado
export type SkillType = (typeof SKILL_TYPE)[keyof typeof SKILL_TYPE]
